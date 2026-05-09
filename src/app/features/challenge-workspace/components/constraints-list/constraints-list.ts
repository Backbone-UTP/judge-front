import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import type { ChallengeConstraintDto } from '../../types/challenge.types';

@Component({
  selector: 'app-constraints-list',
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './constraints-list.html',
  styleUrl: './constraints-list.css',
})
export class ConstraintsList {
  readonly constraints = input.required<readonly ChallengeConstraintDto[]>();
}
