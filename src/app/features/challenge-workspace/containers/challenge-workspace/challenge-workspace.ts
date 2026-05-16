import { Component, inject } from '@angular/core';
import { ProblemContent } from '../../components/problem-content/problem-content';
import { CodeEditor } from '../../components/code-editor/code-editor';
import { ChallengeWorkspaceState } from '../../state/challenge-workspace.state';

@Component({
  selector: 'app-challenge-workspace',
  standalone: true,
  imports: [ProblemContent, CodeEditor],
  templateUrl: './challenge-workspace.html',
  styleUrl: './challenge-workspace.css',
})
export class ChallengeWorkspaceContainer {
  readonly challengeWorkspaceState = inject(ChallengeWorkspaceState);
}