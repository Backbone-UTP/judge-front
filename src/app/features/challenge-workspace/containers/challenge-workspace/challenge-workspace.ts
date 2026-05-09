import { Component, inject } from '@angular/core';

import { CodeEditor } from '../../components/code-editor/code-editor';
import { ProblemContent } from '../../components/problem-content/problem-content';
import { ChallengeWorkspaceState } from '../../state/challenge-workspace.state';
import {
  ChallengeLanguage,
  challengeLanguageLabels,
  isChallengeLanguage,
} from '../../types/challenge.types';

@Component({
  selector: 'app-challenge-workspace',
  standalone: true,
  imports: [CodeEditor, ProblemContent],
  templateUrl: './challenge-workspace.html',
  styleUrl: './challenge-workspace.css',
})
export class ChallengeWorkspaceContainer {
  protected readonly challengeWorkspaceState: ChallengeWorkspaceState = inject(ChallengeWorkspaceState);
  protected readonly languageLabels: Record<ChallengeLanguage, string> = challengeLanguageLabels;

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
