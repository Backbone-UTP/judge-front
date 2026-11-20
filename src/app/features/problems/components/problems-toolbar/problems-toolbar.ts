import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

import type { Difficulty, ProblemStatus } from '../../../../core/progress/types/progress.types';
import { DIFFICULTY_LABELS, STATUS_LABELS } from '../../problems.labels';

@Component({
  selector: 'app-problems-toolbar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './problems-toolbar.html',
  styleUrl: './problems-toolbar.css',
})
export class ProblemsToolbar {
  readonly search = input('');
  readonly difficulty = input<Difficulty>();
  readonly status = input<ProblemStatus>();

  readonly searchChange = output<string>();
  readonly difficultyChange = output<Difficulty | undefined>();
  readonly statusChange = output<ProblemStatus | undefined>();

  protected readonly difficultyOptions = [
    { value: undefined, label: 'All' },
    ...(Object.entries(DIFFICULTY_LABELS) as [Difficulty, string][]).map(([value, label]) => ({
      value,
      label,
    })),
  ];
  protected readonly statusOptions = Object.entries(STATUS_LABELS) as [ProblemStatus, string][];

  protected onStatus(value: string): void {
    this.statusChange.emit((value || undefined) as ProblemStatus | undefined);
  }
}
