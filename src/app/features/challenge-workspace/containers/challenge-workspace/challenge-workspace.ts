import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { ConstraintsList } from '../../components/constraints-list/constraints-list';
import { ExampleBlock } from '../../components/example-block/example-block';
import twoSumChallengeFixture from '../../fixtures/two-sum.challenge.json';
import type { ChallengeProblemDto } from '../../types/challenge.types';

@Component({
  selector: 'app-challenge-workspace',
  imports: [ConstraintsList, ExampleBlock],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './challenge-workspace.html',
  styleUrl: './challenge-workspace.css',
})
export class ChallengeWorkspaceContainer {
  readonly challenge = input<ChallengeProblemDto>(twoSumChallengeFixture as ChallengeProblemDto);
}
