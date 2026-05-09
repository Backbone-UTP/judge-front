import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengeWorkspaceContainer } from './challenge-workspace';

describe('ChallengeWorkspaceContainer', () => {
  let fixture: ComponentFixture<ChallengeWorkspaceContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChallengeWorkspaceContainer],
    }).compileComponents();

    fixture = TestBed.createComponent(ChallengeWorkspaceContainer);
    fixture.detectChanges();
  });

  it('should switch starter code when selecting another language', () => {
    const nativeElement = fixture.nativeElement as HTMLElement;
    const languageSelector = nativeElement.querySelector('#language-selector') as HTMLSelectElement;
    const editorInput = nativeElement.querySelector('.editor-input') as HTMLTextAreaElement;

    expect(editorInput.value).toContain('function twoSum');

    languageSelector.value = 'python';
    languageSelector.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    expect(editorInput.value).toContain('def two_sum');
  });

  it('should keep edited code synchronized in feature state', () => {
    const nativeElement = fixture.nativeElement as HTMLElement;
    const languageSelector = nativeElement.querySelector('#language-selector') as HTMLSelectElement;
    const editorInput = nativeElement.querySelector('.editor-input') as HTMLTextAreaElement;

    editorInput.value = 'function twoSum(){ return [1,2]; }';
    editorInput.selectionStart = editorInput.value.length;
    editorInput.selectionEnd = editorInput.value.length;
    editorInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    languageSelector.value = 'python';
    languageSelector.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    languageSelector.value = 'javascript';
    languageSelector.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    expect(editorInput.value).toBe('function twoSum(){ return [1,2]; }');
  });
});
