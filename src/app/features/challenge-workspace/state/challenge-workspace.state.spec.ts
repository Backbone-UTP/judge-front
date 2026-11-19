import { starterCodeByLanguage } from '../types/challenge.types';
import { ChallengeWorkspaceState } from './challenge-workspace.state';

describe('ChallengeWorkspaceState', () => {
  it('should start with the starter code of the selected language', () => {
    const state = new ChallengeWorkspaceState();

    expect(state.code()).toBe(starterCodeByLanguage.javascript);

    state.setLanguage('python');
    expect(state.code()).toBe(starterCodeByLanguage.python);
  });

  it('should keep edits per language when switching', () => {
    const state = new ChallengeWorkspaceState();

    state.updateCode('// my js');
    state.setLanguage('python');
    state.updateCode('# my py');
    state.setLanguage('javascript');

    expect(state.code()).toBe('// my js');
    state.setLanguage('python');
    expect(state.code()).toBe('# my py');
  });

  it('should keep the selected language when updating code', () => {
    const state = new ChallengeWorkspaceState();
    state.setLanguage('python');

    state.updateCode('print(1)');

    expect(state.selectedLanguage()).toBe('python');
  });
});
