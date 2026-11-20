import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  untracked,
} from '@angular/core';
import { rxResource, takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, type ParamMap } from '@angular/router';
import { EMPTY, map, Subject, switchMap, timer } from 'rxjs';

import { ProblemsRepository } from '../../../../core/progress/data-access/progress.repositories';
import type {
  Difficulty,
  ProblemsQuery,
  ProblemStatus,
} from '../../../../core/progress/types/progress.types';
import { ProblemsTable } from '../../components/problems-table/problems-table';
import { ProblemsToolbar } from '../../components/problems-toolbar/problems-toolbar';
import { DIFFICULTY_LABELS } from '../../problems.labels';

const DIFFICULTIES: readonly Difficulty[] = ['easy', 'medium', 'hard'];
const STATUSES: readonly ProblemStatus[] = ['solved', 'attempted', 'todo'];

/** The URL is the source of truth for filters, so a filtered list can be shared or reloaded. */
function parseQuery(params: ParamMap): ProblemsQuery {
  const page = Number(params.get('page'));
  return {
    search: params.get('search')?.trim() || undefined,
    difficulty: DIFFICULTIES.find((difficulty) => difficulty === params.get('difficulty')),
    status: STATUSES.find((status) => status === params.get('status')),
    page: Number.isInteger(page) && page > 1 ? page : 1,
  };
}

@Component({
  selector: 'app-problems-page',
  imports: [ProblemsToolbar, ProblemsTable],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './problems-page.html',
  styleUrl: './problems-page.css',
})
export class ProblemsPage {
  private readonly repository = inject(ProblemsRepository);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  /** `null` cancels a pending search. */
  private readonly searchInput = new Subject<string | null>();

  protected readonly difficulties = DIFFICULTIES;
  protected readonly difficultyLabels = DIFFICULTY_LABELS;

  readonly query = toSignal(this.route.queryParamMap.pipe(map(parseQuery)), {
    requireSync: true,
  });

  readonly problems = rxResource({
    params: () => this.query(),
    stream: ({ params }) => this.repository.list(params),
  });

  readonly solved = rxResource({ stream: () => this.repository.getSolvedByDifficulty() });

  readonly hasFilters = computed(() => {
    const { search, difficulty, status } = this.query();
    return Boolean(search || difficulty || status);
  });

  /** `value()` throws while the resource is in error, so read it through this guard. */
  protected readonly result = computed(() =>
    this.problems.hasValue() ? this.problems.value() : undefined,
  );

  readonly pages = computed(() => {
    const result = this.result();
    const count = result ? Math.max(1, Math.ceil(result.total / result.pageSize)) : 1;
    // ponytail: one button per page; add an ellipsis when the catalog passes ~10 pages.
    return Array.from({ length: count }, (_, index) => index + 1);
  });

  readonly summary = computed(() => {
    const result = this.result();
    if (!result || result.items.length === 0) {
      return '';
    }
    const first = (result.page - 1) * result.pageSize + 1;
    const last = first + result.items.length - 1;
    return `Showing ${first}–${last} of ${result.total} problems`;
  });

  constructor() {
    // No distinctUntilChanged: after Clear filters the same term must apply again,
    // and navigating to identical params is already a no-op.
    this.searchInput
      .pipe(
        switchMap((search) => (search === null ? EMPTY : timer(300).pipe(map(() => search)))),
        takeUntilDestroyed(),
      )
      .subscribe((search) => this.applyFilters({ search }));

    // A shared or stale link can point past the last page; replace it so Back doesn't loop.
    effect(() => {
      const result = this.result();
      const lastPage = this.pages().length;
      if (result && result.total > 0 && result.page > lastPage) {
        untracked(() => this.navigate({ ...this.query(), page: lastPage }, true));
      }
    });
  }

  onSearch(value: string): void {
    this.searchInput.next(value.trim());
  }

  applyFilters(change: Partial<ProblemsQuery>): void {
    this.navigate({ ...this.query(), ...change, page: 1 });
  }

  goToPage(page: number): void {
    this.navigate({ ...this.query(), page });
  }

  clearFilters(): void {
    this.searchInput.next(null);
    this.navigate({});
  }

  private navigate({ search, difficulty, status, page }: ProblemsQuery, replaceUrl = false): void {
    void this.router.navigate([], {
      relativeTo: this.route,
      replaceUrl,
      queryParams: {
        search: search || null,
        difficulty: difficulty ?? null,
        status: status ?? null,
        page: page && page > 1 ? page : null,
      },
    });
  }
}
