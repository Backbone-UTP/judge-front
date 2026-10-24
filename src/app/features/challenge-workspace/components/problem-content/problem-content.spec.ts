import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProblemContent } from './problem-content';
import type { ChallengeProblemDto } from '../../types/challenge.types';

const mockChallenge: ChallengeProblemDto = {
  title: 'Test Challenge',
  descriptionParagraphs: ['Test paragraph'],
  examples: [{ input: 'input1', output: 'output1', explanation: 'test explanation' }],
  constraints: [{ kind: 'text', text: 'test constraint' }],
};

describe('ProblemContent', () => {
  let component: ProblemContent;
  let fixture: ComponentFixture<ProblemContent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProblemContent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProblemContent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display challenge title', () => {
    TestBed.runInInjectionContext(() => {
      fixture.componentRef.setInput('challenge', mockChallenge);
      fixture.detectChanges();

      const h1 = fixture.nativeElement.querySelector('h1');
      expect(h1?.textContent).toBe('Test Challenge');
    });
  });

  it('should render description paragraphs', () => {
    TestBed.runInInjectionContext(() => {
      fixture.componentRef.setInput('challenge', mockChallenge);
      fixture.detectChanges();

      const paragraphs = fixture.nativeElement.querySelectorAll('.problem-description p');
      expect(paragraphs.length).toBe(1);
      expect(paragraphs[0].textContent).toBe('Test paragraph');
    });
  });

  it('should render examples', () => {
    TestBed.runInInjectionContext(() => {
      fixture.componentRef.setInput('challenge', mockChallenge);
      fixture.detectChanges();

      const exampleBlocks = fixture.debugElement.queryAll((el) => el.name === 'app-example-block');
      expect(exampleBlocks.length).toBe(1);
    });
  });

  it('should render constraints', () => {
    TestBed.runInInjectionContext(() => {
      fixture.componentRef.setInput('challenge', mockChallenge);
      fixture.detectChanges();

      const constraintsList = fixture.debugElement.query(
        (el) => el.name === 'app-constraints-list',
      );
      expect(constraintsList).toBeTruthy();
    });
  });
});
