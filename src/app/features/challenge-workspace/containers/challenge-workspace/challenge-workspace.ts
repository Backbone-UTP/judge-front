import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';

import { ConstraintsList } from '../../components/constraints-list/constraints-list';
import { ExampleBlock } from '../../components/example-block/example-block';
import twoSumChallengeFixture from '../../fixtures/two-sum.challenge.json';
import type { ChallengeProblemDto } from '../../types/challenge.types';
import type { ExecutionResult } from '../../types/challenge.types/challenge.types';
import { challengeWorkspaceRoutes } from '../../challenge-workspace.routes';
import { ChallengeTabs } from '../../../../components/challenge-tabs/challenge-tabs';
import { WorkspaceActions } from '../../components/workspace-actions/workspace-actions';
import { ResultsPanel } from '../../components/results-panel/results-panel';

@Component({
  selector: 'app-challenge-workspace',
  imports: [ConstraintsList, ExampleBlock, ChallengeTabs, WorkspaceActions, ResultsPanel],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './challenge-workspace.html',
  styleUrl: './challenge-workspace.css',
})
export class ChallengeWorkspaceContainer {
  readonly tabActive = signal('Description');
  readonly challenge = input<ChallengeProblemDto>(twoSumChallengeFixture as ChallengeProblemDto);
  readonly result = signal<ExecutionResult>({
    message: 'Run your code to see the result.',
  });

  tabChanges(tab: string){
    this.tabActive.set(tab);
  }
}
