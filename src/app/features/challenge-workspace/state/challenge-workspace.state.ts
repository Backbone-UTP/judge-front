import { computed, Injectable, signal } from '@angular/core';

import {
  challengeLanguageLabels,
  challengeLanguages,
  ChallengeLanguage,
  challengeStarterCode,
} from '../types/challenge.types';

@Injectable({ providedIn: 'root' })
export class ChallengeWorkspaceState {
  readonly languages = challengeLanguages;
  readonly selectedLanguage = signal<ChallengeLanguage>('javascript');
  private readonly codeByLanguage = signal({ ...challengeStarterCode });

  readonly code = computed(() => this.codeByLanguage()[this.selectedLanguage()]);
  readonly selectedLanguageLabel = computed(() => challengeLanguageLabels[this.selectedLanguage()]);

  selectLanguage(language: ChallengeLanguage): void {
    this.selectedLanguage.set(language);
  }

  updateCode(code: string): void {
    const activeLanguage = this.selectedLanguage();
    this.codeByLanguage.update((currentCodeByLanguage) => ({
      ...currentCodeByLanguage,
      [activeLanguage]: code,
    }));
  }

  resetWorkspace(): void {
    this.selectedLanguage.set('javascript');
    this.codeByLanguage.set({ ...challengeStarterCode });
  }
}
