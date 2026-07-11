import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  signal,
} from '@angular/core';
import { LanguageId } from '../../types/challenge.types';

@Component({
  selector: 'app-editor-toolbar',
  imports: [],
  templateUrl: './editor-toolbar.html',
  styleUrl: './editor-toolbar.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditorToolbar {

  readonly languages = input.required<LanguageId[]>();

  readonly selectedLanguage = input.required<LanguageId>();

  readonly isLanguageMenuOpen = signal(false);

  readonly languageLabels: Record<LanguageId, string> = {
    javascript: 'JavaScript',
    python: 'Python',
  };

  readonly languageChange = output<LanguageId>();

  readonly settingsClick = output<void>();

  readonly resetClick = output<void>();

  readonly expandClick = output<void>();

  toggleLanguageMenu(): void {
    this.isLanguageMenuOpen.update(value => !value);
  }

  changeLanguage(language: LanguageId): void {
    this.languageChange.emit(language);
    this.isLanguageMenuOpen.set(false);
  }

  onSettingsClick(): void {
    this.settingsClick.emit();
  }

  onResetClick(): void {
    this.resetClick.emit();
  }

  onExpandClick(): void {
    this.expandClick.emit();
  }
}