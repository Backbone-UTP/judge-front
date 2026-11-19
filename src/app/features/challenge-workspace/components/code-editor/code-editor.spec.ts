import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeEditor } from './code-editor';

describe('CodeEditor', () => {
  let fixture: ComponentFixture<CodeEditor>;
  let root: HTMLElement;

  function textarea(): HTMLTextAreaElement {
    return root.querySelector('textarea') as HTMLTextAreaElement;
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [CodeEditor] }).compileComponents();

    fixture = TestBed.createComponent(CodeEditor);
    fixture.componentRef.setInput('code', 'const a = 1;\nreturn a;\n');
    fixture.componentRef.setInput('language', 'javascript');
    fixture.detectChanges();
    root = fixture.nativeElement as HTMLElement;
  });

  it('should render one line number per line', () => {
    const numbers = [...root.querySelectorAll('.line-number')].map((el) => el.textContent?.trim());

    expect(numbers).toEqual(['1', '2', '3']);
  });

  it('should render highlighted code in the hidden layer', () => {
    const layer = root.querySelector('.editor-highlight') as HTMLElement;

    expect(layer.getAttribute('aria-hidden')).toBe('true');
    expect(layer.querySelectorAll('.token-keyword')).toHaveLength(2);
    expect(layer.querySelector('.token-number')?.textContent).toBe('1');
  });

  it('should emit codeChange when the user types', () => {
    const emitted: string[] = [];
    fixture.componentInstance.codeChange.subscribe((value) => emitted.push(value));

    textarea().value = 'let b = 2;';
    textarea().dispatchEvent(new Event('input'));

    expect(emitted).toEqual(['let b = 2;']);
  });

  it('should mark the line under the cursor as active', () => {
    textarea().setSelectionRange(14, 14);
    textarea().dispatchEvent(new Event('keyup'));
    fixture.detectChanges();

    const active = root.querySelector('.line-number--active');
    expect(active?.textContent?.trim()).toBe('2');
  });

  it('should scroll the highlight layer and gutter with the textarea', () => {
    textarea().scrollTop = 52;
    textarea().scrollLeft = 10;
    textarea().dispatchEvent(new Event('scroll'));
    fixture.detectChanges();

    const layer = root.querySelector('.editor-highlight') as HTMLElement;
    const gutter = root.querySelector('.line-gutter') as HTMLElement;
    expect(layer.scrollTop).toBe(52);
    expect(layer.scrollLeft).toBe(10);
    expect(layer.style.transform).toBe('');
    expect(gutter.scrollTop).toBe(52);
  });
});
