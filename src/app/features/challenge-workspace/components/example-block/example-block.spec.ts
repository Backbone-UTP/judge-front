import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExampleBlock } from './example-block';
import type { ChallengeExampleDto } from '../../types/challenge.types';

describe('ExampleBlock', () => {
  let fixture: ComponentFixture<ExampleBlock>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExampleBlock],
    }).compileComponents();

    fixture = TestBed.createComponent(ExampleBlock);
  });

  it('should create', () => {
    fixture.componentRef.setInput('example', {
      input: 'nums = [1], target = 1',
      output: '[0]',
    });
    fixture.componentRef.setInput('index', 1);
    fixture.detectChanges();

    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render Input before Output before Explanation when explanation exists', () => {
    const example: ChallengeExampleDto = {
      input: 'a',
      output: 'b',
      explanation: 'c',
    };
    fixture.componentRef.setInput('example', example);
    fixture.componentRef.setInput('index', 2);
    fixture.detectChanges();

    const root = fixture.nativeElement as HTMLElement;
    const keys = [...root.querySelectorAll('.example-key')].map((el) => el.textContent?.trim());

    expect(keys).toEqual(['Input:', 'Output:', 'Explanation:']);
    const bodyText = root.querySelector('.example-body')?.textContent ?? '';
    expect(bodyText.indexOf('Input:')).toBeLessThan(bodyText.indexOf('Output:'));
    expect(bodyText.indexOf('Output:')).toBeLessThan(bodyText.indexOf('Explanation:'));
  });

  it('should not render Explanation when optional field is omitted', () => {
    fixture.componentRef.setInput('example', {
      input: 'x',
      output: 'y',
    });
    fixture.componentRef.setInput('index', 3);
    fixture.detectChanges();

    const root = fixture.nativeElement as HTMLElement;
    const keys = [...root.querySelectorAll('.example-key')].map((el) => el.textContent?.trim());

    expect(keys).toEqual(['Input:', 'Output:']);
    expect(root.textContent).not.toContain('Explanation:');
  });
});
