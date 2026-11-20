import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import type { ProblemSummary } from '../../../../core/progress/types/progress.types';
import { DIFFICULTY_LABELS, STATUS_LABELS } from '../../problems.labels';

@Component({
  selector: 'app-problems-table',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './problems-table.html',
  styleUrl: './problems-table.css',
})
export class ProblemsTable {
  readonly problems = input.required<readonly ProblemSummary[]>();
  readonly loading = input(false);

  protected readonly difficultyLabels = DIFFICULTY_LABELS;
  protected readonly statusLabels = STATUS_LABELS;
  protected readonly skeletonRows = Array.from({ length: 8 }, (_, index) => index);
}
