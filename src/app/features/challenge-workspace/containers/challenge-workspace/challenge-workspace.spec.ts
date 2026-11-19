import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { AuthRepository } from '../../../auth/data-access/auth.repository';
import { FakeAuthRepository } from '../../../auth/data-access/fake-auth.repository';
import { EditorToolbar } from '../../components/editor-toolbar/editor-toolbar';
import twoSumChallengeFixture from '../../fixtures/two-sum.challenge.json';
import { starterCodeByLanguage, type ChallengeProblemDto } from '../../types/challenge.types';
import { ChallengeWorkspaceContainer } from './challenge-workspace';

describe('ChallengeWorkspaceContainer', () => {
  let fixture: ComponentFixture<ChallengeWorkspaceContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChallengeWorkspaceContainer],
      providers: [{ provide: AuthRepository, useClass: FakeAuthRepository }],
    }).compileComponents();

    fixture = TestBed.createComponent(ChallengeWorkspaceContainer);
  });

  it('should create', async () => {
    await fixture.whenStable();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render challenge title from the default JSON fixture', async () => {
    fixture.detectChanges();
    await fixture.whenStable();

    const root = fixture.nativeElement as HTMLElement;
    expect(root.querySelector('h1')?.textContent?.trim()).toBe(twoSumChallengeFixture.title);
  });

  it('should render structured examples and constraints from the fixture', async () => {
    fixture.detectChanges();
    await fixture.whenStable();

    const root = fixture.nativeElement as HTMLElement;

    expect(root.querySelectorAll('app-example-block').length).toBe(
      twoSumChallengeFixture.examples.length,
    );
    expect(root.textContent).toContain('Constraints:');
  });

  it('should render extended description in the problem panel for long fixtures', async () => {
    const base = twoSumChallengeFixture as ChallengeProblemDto;
    const longChallenge: ChallengeProblemDto = {
      ...base,
      descriptionParagraphs: Array.from({ length: 80 }, (_, i) => `Line ${i} `.repeat(20)),
    };

    fixture.componentRef.setInput('challenge', longChallenge);
    fixture.detectChanges();
    await fixture.whenStable();

    const root = fixture.nativeElement as HTMLElement;
    const panel = root.querySelector('.workspace-problem');
    expect(panel).toBeTruthy();
    expect(panel!.classList.contains('workspace-panel')).toBe(true);
    expect(root.querySelectorAll('.problem-content > p').length).toBe(80);
  });

  it('should load the starter of the language chosen in the toolbar', () => {
    fixture.detectChanges();
    const toolbar = fixture.debugElement.query(By.directive(EditorToolbar));

    toolbar.componentInstance.languageChange.emit('python');
    fixture.detectChanges();

    const editor = fixture.nativeElement.querySelector('app-code-editor textarea');
    expect(editor.value).toBe(starterCodeByLanguage.python);
  });

  it('should store what the user types in the feature state', () => {
    fixture.detectChanges();
    const editor = fixture.nativeElement.querySelector(
      'app-code-editor textarea',
    ) as HTMLTextAreaElement;

    editor.value = 'function solve() { return 42; }';
    editor.dispatchEvent(new Event('input'));

    expect(fixture.componentInstance.state.code()).toBe('function solve() { return 42; }');
  });
});
