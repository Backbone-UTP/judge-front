import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengeWorkspaceState } from './challenge-workspace.state';

describe('ChallengeWorkspaceState', () => {
  let component: ChallengeWorkspaceState;
  let fixture: ComponentFixture<ChallengeWorkspaceState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChallengeWorkspaceState],
    }).compileComponents();

    fixture = TestBed.createComponent(ChallengeWorkspaceState);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
