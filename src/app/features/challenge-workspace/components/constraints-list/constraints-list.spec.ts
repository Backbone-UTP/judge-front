import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConstraintsList } from './constraints-list';
import type { ChallengeConstraintDto } from '../../types/challenge.types';

describe('ConstraintsList', () => {
  let fixture: ComponentFixture<ConstraintsList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConstraintsList],
    }).compileComponents();

    fixture = TestBed.createComponent(ConstraintsList);
  });

  it('should create', () => {
    fixture.componentRef.setInput('constraints', []);
    fixture.detectChanges();

    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should preserve constraint order in the DOM', () => {
    const constraints: ChallengeConstraintDto[] = [
      { kind: 'text', text: 'First' },
      { kind: 'boundedRange', lower: '1', middle: ' < n < ', upper: '2' },
      { kind: 'text', text: 'Third' },
    ];
    fixture.componentRef.setInput('constraints', constraints);
    fixture.detectChanges();

    const root = fixture.nativeElement as HTMLElement;
    const texts = [...root.querySelectorAll('.constraint-item')].map((el) =>
      el.textContent?.trim(),
    );

    expect(texts).toEqual(['First', '1 < n < 2', 'Third']);
  });

  it('should render bounded constraints as a single code pill with combined text', () => {
    const constraints: ChallengeConstraintDto[] = [
      { kind: 'boundedRange', lower: '2', middle: ' <= nums.length <= ', upper: '10^4' },
    ];
    fixture.componentRef.setInput('constraints', constraints);
    fixture.detectChanges();

    const root = fixture.nativeElement as HTMLElement;
    const pill = root.querySelector('.constraint-code-pill');

    expect(pill?.textContent?.trim()).toBe('2 <= nums.length <= 10^4');
    expect(root.querySelectorAll('.constraint-code-pill').length).toBe(1);
  });

  it('should render plain text constraints without code pill', () => {
    const constraints: ChallengeConstraintDto[] = [
      { kind: 'text', text: 'Only one valid answer exists.' },
    ];
    fixture.componentRef.setInput('constraints', constraints);
    fixture.detectChanges();

    const root = fixture.nativeElement as HTMLElement;

    expect(root.querySelectorAll('.constraint-code-pill').length).toBe(0);
    expect(root.querySelector('.constraint-plain')?.textContent?.trim()).toBe(
      'Only one valid answer exists.',
    );
  });
});
