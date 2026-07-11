import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengeExecutionService } from './challenge-execution.service';

describe('ChallengeExecutionService', () => {
  let component: ChallengeExecutionService;
  let fixture: ComponentFixture<ChallengeExecutionService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChallengeExecutionService],
    }).compileComponents();

    fixture = TestBed.createComponent(ChallengeExecutionService);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
