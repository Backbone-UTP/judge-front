import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkspaceActions } from './workspace-actions';

describe('WorkspaceActions', () => {
  let component: WorkspaceActions;
  let fixture: ComponentFixture<WorkspaceActions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkspaceActions],
    }).compileComponents();

    fixture = TestBed.createComponent(WorkspaceActions);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
