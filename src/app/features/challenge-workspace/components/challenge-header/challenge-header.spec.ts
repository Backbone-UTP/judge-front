import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengeHeader } from './challenge-header';

describe('ChallengeHeader', () => {
  let component: ChallengeHeader;
  let fixture: ComponentFixture<ChallengeHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChallengeHeader],
    }).compileComponents();

    fixture = TestBed.createComponent(ChallengeHeader);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
