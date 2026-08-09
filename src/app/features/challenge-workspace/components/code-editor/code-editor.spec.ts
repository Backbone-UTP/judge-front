import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeEditor } from './code-editor';

describe('CodeEditor', () => {
  let component: CodeEditor;
  let fixture: ComponentFixture<CodeEditor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CodeEditor],
    }).compileComponents();

    fixture = TestBed.createComponent(CodeEditor);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('code', 'const answer = 42;\nreturn answer;');
    fixture.componentRef.setInput('language', 'javascript');
    fixture.detectChanges();
  });

  it('should render line numbers for each code line', () => {
    const nativeElement = fixture.nativeElement as HTMLElement;
    const lineNumbers = nativeElement.querySelectorAll('.line-number');

    expect(lineNumbers.length).toBe(2);
  });

  it('should emit code changes from editor input', () => {
    const nativeElement = fixture.nativeElement as HTMLElement;
    const editorInput = nativeElement.querySelector('.editor-input') as HTMLTextAreaElement;
    const emittedCode: string[] = [];
    component.codeChange.subscribe((value) => emittedCode.push(value));

    editorInput.value = 'const updated = 1;';
    editorInput.selectionStart = editorInput.value.length;
    editorInput.selectionEnd = editorInput.value.length;
    editorInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(emittedCode).toEqual(['const updated = 1;']);
  });

  it('should highlight active line when cursor moves', () => {
    const nativeElement = fixture.nativeElement as HTMLElement;
    const editorInput = nativeElement.querySelector('.editor-input') as HTMLTextAreaElement;
    const secondLineStart = editorInput.value.indexOf('\n') + 1;

    editorInput.selectionStart = secondLineStart;
    editorInput.selectionEnd = secondLineStart;
    editorInput.dispatchEvent(new Event('keyup'));
    fixture.detectChanges();

    expect(nativeElement.querySelector('.line-number--active')?.textContent?.trim()).toBe('2');
  });

  it('should render syntax highlighted content', () => {
    const nativeElement = fixture.nativeElement as HTMLElement;
    const highlightedCode = nativeElement.querySelector('.editor-highlight code')?.innerHTML ?? '';

    expect(highlightedCode).toContain('token-keyword');
  });

  it('should sync the highlighted layer with horizontal scrolling', () => {
    const nativeElement = fixture.nativeElement as HTMLElement;
    const editorInput = nativeElement.querySelector('.editor-input') as HTMLTextAreaElement;
    const editorHighlight = nativeElement.querySelector('.editor-highlight') as HTMLElement;

    editorInput.scrollLeft = 48;
    editorInput.dispatchEvent(new Event('scroll'));
    fixture.detectChanges();

    expect(editorHighlight.style.transform).toContain('translate(-48px, -0px)');
  });

  it('should keep // inside string literals from being parsed as comments', () => {
    fixture.componentRef.setInput('code', 'const url = "https://example.com/path";');
    fixture.detectChanges();

    const nativeElement = fixture.nativeElement as HTMLElement;
    const highlightedCode = nativeElement.querySelector('.editor-highlight code')?.innerHTML ?? '';

    expect(highlightedCode).toContain('token-string');
    expect(highlightedCode).not.toContain('token-comment');
  });
});
