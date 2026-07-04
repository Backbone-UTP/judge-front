import { ChangeDetectionStrategy, Component, inject, input, signal } from '@angular/core';

import { ConstraintsList } from '../../components/constraints-list/constraints-list';
import { ExampleBlock } from '../../components/example-block/example-block';
import twoSumChallengeFixture from '../../fixtures/two-sum.challenge.json';
import type { ChallengeProblemDto } from '../../types/challenge.types';
import { ChallengeTabs } from '../../../../components/challenge-tabs/challenge-tabs';
import { AuthFacade } from '../../../auth/state/auth-facade';
import { Router } from '@angular/router';

@Component({
  selector: 'app-challenge-workspace',
  imports: [ConstraintsList, ExampleBlock, ChallengeTabs],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './challenge-workspace.html',
  styleUrl: './challenge-workspace.css',
})
export class ChallengeWorkspaceContainer {
  readonly authFacade = inject(AuthFacade);

  private readonly router = inject(Router);
  tabActive = signal('Description');
  readonly challenge = input<ChallengeProblemDto>(twoSumChallengeFixture as ChallengeProblemDto);
  tabChanges(tab: string) {
    this.tabActive.set(tab);
  }

  logout(): void {
    this.authFacade.logout().subscribe({
      next: () => {
        void this.router.navigateByUrl('/login');
      },
    });
  }
}
