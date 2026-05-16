import { Component } from '@angular/core';
import { ProblemContent } from '../../components/problem-content/problem-content';

@Component({
  selector: 'app-challenge-workspace',
  standalone: true,
  imports: [ProblemContent],
  templateUrl: './challenge-workspace.html',
  styleUrl: './challenge-workspace.css',
})
export class ChallengeWorkspaceContainer {
  
}