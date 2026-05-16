import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengeTabs } from './challenge-tabs';

describe('ChallengeTabs', () => {
  let component: ChallengeTabs;
  let fixture: ComponentFixture<ChallengeTabs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChallengeTabs],
    }).compileComponents();

    fixture = TestBed.createComponent(ChallengeTabs);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
