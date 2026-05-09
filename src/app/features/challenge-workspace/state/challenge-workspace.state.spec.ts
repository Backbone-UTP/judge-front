import { TestBed } from '@angular/core/testing';

import { ChallengeWorkspaceState } from './challenge-workspace.state';

describe('ChallengeWorkspaceState', () => {
  let state: ChallengeWorkspaceState;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    state = TestBed.inject(ChallengeWorkspaceState);
  });

  it('should load starter code when language changes', () => {
    expect(state.code()).toContain('function twoSum');

    state.selectLanguage('python');

    expect(state.code()).toContain('def two_sum');
  });

  it('should keep editable code in feature state per language', () => {
    state.selectLanguage('javascript');
    state.updateCode('const custom = 1;');
    expect(state.code()).toBe('const custom = 1;');

    state.selectLanguage('python');
    state.updateCode('print("custom")');
    expect(state.code()).toBe('print("custom")');

    state.selectLanguage('javascript');
    expect(state.code()).toBe('const custom = 1;');
  });
});
