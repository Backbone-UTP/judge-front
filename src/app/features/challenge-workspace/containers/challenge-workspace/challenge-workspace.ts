import { Component } from '@angular/core';

@Component({
  selector: 'app-challenge-workspace',
  standalone: true,
  imports: [],
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
