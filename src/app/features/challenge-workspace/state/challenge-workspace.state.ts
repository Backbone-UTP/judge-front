import { computed, signal } from '@angular/core';
import { LanguageId, starterCodeByLanguage } from '../types/challenge.types';

export class ChallengeWorkspaceState {
  readonly languages: LanguageId[] = ['javascript', 'python'];

  readonly selectedLanguage = signal<LanguageId>('javascript');

  // Edits are kept per language, so switching back restores what the user wrote.
  private readonly codeByLanguage = signal<Record<LanguageId, string>>({
    ...starterCodeByLanguage,
  });

  readonly code = computed(() => this.codeByLanguage()[this.selectedLanguage()]);

  setLanguage(language: LanguageId) {
    this.selectedLanguage.set(language);
  }

  updateCode(code: string): void {
    const language = this.selectedLanguage();
    this.codeByLanguage.update((current) => ({ ...current, [language]: code }));
  }
}
