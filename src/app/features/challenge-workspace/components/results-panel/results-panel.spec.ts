import { ComponentFixture, TestBed } from '@angular/core/testing';

import type { ExecutionResult } from '../../types/challenge.types/challenge.types';
import { ResultsPanel } from './results-panel';

describe('ResultsPanel', () => {
  let component: ResultsPanel;
  let fixture: ComponentFixture<ResultsPanel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResultsPanel],
    }).compileComponents();

    fixture = TestBed.createComponent(ResultsPanel);
    fixture.componentRef.setInput('result', {
      status: 'idle',
      message: 'Run your code to see the result.',
    } satisfies ExecutionResult);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
