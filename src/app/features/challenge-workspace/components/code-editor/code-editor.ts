import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';

import { ChallengeLanguage } from '../../types/challenge.types';

@Component({
  selector: 'app-code-editor',
  imports: [],
  templateUrl: './code-editor.html',
  styleUrl: './code-editor.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CodeEditor {
  readonly code = input.required<string>();
  readonly language = input.required<ChallengeLanguage>();
  readonly codeChange = output<string>();

  private readonly lineHeightPx = 24;
  private readonly lineGutter = viewChild<ElementRef<HTMLDivElement>>('lineGutter');

  protected readonly scrollTop = signal(0);
  protected readonly activeLine = signal(1);
  protected readonly lineNumbers = computed(() =>
    Array.from({ length: this.code().split(/\r?\n/).length }, (_, index) => index + 1),
  );
  protected readonly highlightedCode = computed(() =>
    this.highlightSyntax(this.code(), this.language()),
  );
  protected readonly activeLineOffset = computed(
    () => (this.activeLine() - 1) * this.lineHeightPx - this.scrollTop(),
  );

  protected onCodeInput(event: Event): void {
    const target = event.target as HTMLTextAreaElement;
    this.codeChange.emit(target.value);
    this.updateActiveLine(target);
  }

  protected onCursorChange(event: Event): void {
    this.updateActiveLine(event.target as HTMLTextAreaElement);
  }

  protected onScroll(event: Event): void {
    const target = event.target as HTMLTextAreaElement;
    this.scrollTop.set(target.scrollTop);
    this.syncGutterScroll(target.scrollTop);
  }

  private updateActiveLine(editor: HTMLTextAreaElement): void {
    const currentCode = editor.value.slice(0, editor.selectionStart);
    this.activeLine.set(currentCode.split(/\r?\n/).length);
  }

  private syncGutterScroll(scrollTop: number): void {
    const gutter = this.lineGutter();

    if (gutter) {
      gutter.nativeElement.scrollTop = scrollTop;
    }
  }

  private highlightSyntax(code: string, language: ChallengeLanguage): string {
    const escapedCode = this.escapeHtml(code);
    const keywordPattern = this.getKeywordPattern(language);
    const commentPattern = language === 'python' ? /(#.*)$/gm : /(\/\/.*)$/gm;

    return escapedCode
      .replace(commentPattern, '<span class="token-comment">$1</span>')
      .replace(/(["'`].*?["'`])/g, '<span class="token-string">$1</span>')
      .replace(/\b(\d+)\b/g, '<span class="token-number">$1</span>')
      .replace(keywordPattern, '<span class="token-keyword">$1</span>');
  }

  private getKeywordPattern(language: ChallengeLanguage): RegExp {
    const keywordByLanguage: Record<ChallengeLanguage, string[]> = {
      javascript: ['const', 'let', 'function', 'return', 'if', 'for', 'new'],
      typescript: ['const', 'let', 'function', 'return', 'if', 'for', 'new', 'number'],
      python: ['def', 'return', 'for', 'if', 'in'],
      java: ['class', 'public', 'int', 'return', 'new', 'for', 'if'],
      cpp: ['class', 'public', 'return', 'const', 'int', 'for', 'if'],
    };
    const escapedKeywords = keywordByLanguage[language].join('|');

    return new RegExp(`\\b(${escapedKeywords})\\b`, 'g');
  }

  private escapeHtml(value: string): string {
    return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
  }
}
