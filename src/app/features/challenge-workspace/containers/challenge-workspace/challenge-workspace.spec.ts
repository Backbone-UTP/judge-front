import { ComponentFixture, TestBed } from '@angular/core/testing';

import twoSumChallengeFixture from '../../fixtures/two-sum.challenge.json';
import type { ChallengeProblemDto } from '../../types/challenge.types';
import { ChallengeWorkspaceContainer } from './challenge-workspace';

describe('ChallengeWorkspaceContainer', () => {
  let fixture: ComponentFixture<ChallengeWorkspaceContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChallengeWorkspaceContainer],
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
});
