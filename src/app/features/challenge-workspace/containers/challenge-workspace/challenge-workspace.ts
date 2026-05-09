import { Component, inject } from '@angular/core';

import { CodeEditor } from '../../components/code-editor/code-editor';
import { ChallengeWorkspaceState } from '../../state/challenge-workspace.state';
import { challengeLanguageLabels, isChallengeLanguage } from '../../types/challenge.types';

@Component({
  selector: 'app-challenge-workspace',
  standalone: true,
  imports: [CodeEditor],
  templateUrl: './challenge-workspace.html',
  styleUrl: './challenge-workspace.css',
})
export class ChallengeWorkspaceContainer {
  protected readonly challengeWorkspaceState = inject(ChallengeWorkspaceState);
  protected readonly languageLabels = challengeLanguageLabels;

  protected onLanguageChange(event: Event): void {
    const target = event.target as HTMLSelectElement;

    if (isChallengeLanguage(target.value)) {
      this.challengeWorkspaceState.selectLanguage(target.value);
    }
  }

  protected onCodeChange(code: string): void {
    this.challengeWorkspaceState.updateCode(code);
  }
}
