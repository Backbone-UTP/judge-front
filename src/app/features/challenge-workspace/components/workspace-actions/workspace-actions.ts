import { Component} from '@angular/core';
import { ChallengeExecutionService } from '../../services/challenge-execution.service/challenge-execution.service';

@Component({
  selector: 'app-workspace-actions',
  imports: [ChallengeExecutionService],
  templateUrl: './workspace-actions.html',
  styleUrl: './workspace-actions.css',
})
export class WorkspaceActions {}

