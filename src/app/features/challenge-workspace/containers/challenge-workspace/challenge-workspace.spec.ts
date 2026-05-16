import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengeWorkspaceContainer } from './challenge-workspace';

describe('ChallengeWorkspaceContainer', () => {
	let fixture: ComponentFixture<ChallengeWorkspaceContainer>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({ imports: [ChallengeWorkspaceContainer] }).compileComponents();

		fixture = TestBed.createComponent(ChallengeWorkspaceContainer);
	});

	it('should create', () => {
		fixture.detectChanges();
		expect(fixture.componentInstance).toBeTruthy();
	});
});
