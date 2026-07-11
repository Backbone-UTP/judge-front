import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengeTypes } from './challenge.types';

describe('ChallengeTypes', () => {
  let component: ChallengeTypes;
  let fixture: ComponentFixture<ChallengeTypes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChallengeTypes],
    }).compileComponents();

    fixture = TestBed.createComponent(ChallengeTypes);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
