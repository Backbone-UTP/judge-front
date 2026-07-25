import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';

import { ChallengeTabs } from '../../../../components/challenge-tabs/challenge-tabs';
import { CodeEditor } from '../../components/code-editor/code-editor';
import { ProblemContent } from '../../components/problem-content/problem-content';
import { ChallengeWorkspaceState } from '../../state/challenge-workspace.state';
import { AuthFacade } from '../../../auth/state/auth-facade';
import { isChallengeLanguage } from '../../types/challenge.types';

@Component({
  selector: 'app-challenge-workspace',
  standalone: true,
  imports: [ChallengeTabs, ProblemContent, CodeEditor],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './challenge-workspace.html',
  styleUrl: './challenge-workspace.css',
})
export class ChallengeWorkspaceContainer {
  readonly authFacade = inject(AuthFacade);
  readonly challengeWorkspaceState = inject(ChallengeWorkspaceState);

  private readonly router = inject(Router);
  readonly tabActive = signal('Description');

  tabChanges(tab: string): void {
    this.tabActive.set(tab);
  }

  selectLanguage(event: Event): void {
    const target = event.target as HTMLSelectElement;

    if (isChallengeLanguage(target.value)) {
      this.challengeWorkspaceState.selectLanguage(target.value);
    }
  }

  logout(): void {
    this.authFacade.logout().subscribe({
      next: () => {
        this.challengeWorkspaceState.resetWorkspace();
        void this.router.navigateByUrl('/login');
      },
    });
  }
}
