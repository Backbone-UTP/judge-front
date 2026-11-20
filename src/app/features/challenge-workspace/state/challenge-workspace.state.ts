import { signal } from '@angular/core';
import { LanguageId } from '../types/challenge.types';

export class ChallengeWorkspaceState {

    readonly languages: LanguageId[] = [
        'javascript',
        'python'
    ];

    readonly selectedLanguage = signal<LanguageId>('javascript');

    setLanguage(language: LanguageId) {
        this.selectedLanguage.set(language);
    }
}