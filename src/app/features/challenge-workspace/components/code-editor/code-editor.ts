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

import type { LanguageId } from '../../types/challenge.types';
import { highlightCode } from './highlight-code';

const lineHeightPx = 26;

/**
 * Plain textarea with a highlighted layer behind it. Keep this API
 * (code, language, codeChange) stable so the editor can be swapped later.
 */
@Component({
  selector: 'app-code-editor',
  templateUrl: './code-editor.html',
  styleUrl: './code-editor.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CodeEditor {
  readonly code = input.required<string>();
  readonly language = input.required<LanguageId>();
  readonly codeChange = output<string>();

  private readonly gutter = viewChild.required<ElementRef<HTMLElement>>('gutter');
  private readonly highlightLayer = viewChild.required<ElementRef<HTMLElement>>('highlightLayer');
  private readonly scrollTop = signal(0);

  protected readonly activeLine = signal(1);
  protected readonly lineNumbers = computed(() =>
    Array.from({ length: this.code().split('\n').length }, (_, index) => index + 1),
  );
  // The trailing newline keeps the layer as tall as the textarea when the code ends in "\n".
  protected readonly highlightedCode = computed(
    () => highlightCode(this.code(), this.language()) + '\n',
  );
  protected readonly activeLineOffset = computed(
    () => (this.activeLine() - 1) * lineHeightPx - this.scrollTop(),
  );

  protected onInput(editor: HTMLTextAreaElement): void {
    this.codeChange.emit(editor.value);
    this.updateActiveLine(editor);
  }

  protected updateActiveLine(editor: HTMLTextAreaElement): void {
    this.activeLine.set(editor.value.slice(0, editor.selectionStart).split('\n').length);
  }

  // Scroll the layers themselves instead of moving them with transform:
  // a transformed box takes its clipping area with it and hides the code below.
  protected onScroll(editor: HTMLTextAreaElement): void {
    const layer = this.highlightLayer().nativeElement;
    layer.scrollTop = editor.scrollTop;
    layer.scrollLeft = editor.scrollLeft;
    this.gutter().nativeElement.scrollTop = editor.scrollTop;
    this.scrollTop.set(editor.scrollTop);
  }
}
