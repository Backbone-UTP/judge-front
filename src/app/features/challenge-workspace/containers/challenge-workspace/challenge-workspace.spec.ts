import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { of } from 'rxjs';
import { vi } from 'vitest';

import { ChallengeWorkspaceContainer } from './challenge-workspace';
import { AuthFacade } from '../../../auth/state/auth-facade';
import { ChallengeWorkspaceState } from '../../state/challenge-workspace.state';
import { Router } from '@angular/router';

describe('ChallengeWorkspaceContainer', () => {
	let fixture: ComponentFixture<ChallengeWorkspaceContainer>;
	let state: ChallengeWorkspaceState;
	let navigateByUrl: ReturnType<typeof vi.fn>;
	let resetWorkspaceSpy: ReturnType<typeof vi.spyOn>;

	beforeEach(async () => {
		navigateByUrl = vi.fn();
		await TestBed.configureTestingModule({ imports: [ChallengeWorkspaceContainer] }).compileComponents();
		TestBed.overrideProvider(AuthFacade, {
			useValue: {
				user: signal(null),
				logout: () => of(void 0),
			},
		});
		TestBed.overrideProvider(Router, {
			useValue: {
				navigateByUrl,
			},
		});

		fixture = TestBed.createComponent(ChallengeWorkspaceContainer);
		state = TestBed.inject(ChallengeWorkspaceState);
		resetWorkspaceSpy = vi.spyOn(state, 'resetWorkspace');
	});

	it('should create', () => {
		fixture.detectChanges();
		expect(fixture.componentInstance).toBeTruthy();
	});

	it('should reset workspace state on logout', () => {
		fixture.detectChanges();

		state.selectLanguage('python');
		state.updateCode('print("custom")');

		fixture.componentInstance.logout();

		expect(resetWorkspaceSpy).toHaveBeenCalled();
		expect(state.selectedLanguage()).toBe('javascript');
		expect(state.code()).toContain('function twoSum');
		expect(navigateByUrl).toHaveBeenCalledWith('/login');
	});

	it('should update the workspace language from the toolbar', () => {
		fixture.detectChanges();

		const nativeElement = fixture.nativeElement as HTMLElement;
		const languageSelect = nativeElement.querySelector('#language-select') as HTMLSelectElement;

		languageSelect.value = 'python';
		languageSelect.dispatchEvent(new Event('change'));
		fixture.detectChanges();

		expect(state.selectedLanguage()).toBe('python');
		expect(state.code()).toContain('def two_sum');
	});
});
