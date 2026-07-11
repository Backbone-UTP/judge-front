import { Component, input, signal } from '@angular/core';
import { ChallengeExecutionService } from '../../services/challenge-execution.service/challenge-execution.service';

@Component({
  selector: 'app-workspace-actions',
  imports: [ChallengeExecutionService],
  templateUrl: './workspace-actions.html',
  styleUrl: './workspace-actions.css',
})
export class WorkspaceActions {
  RunActive = signal('idle')
  RunCodeDetection(detection:string){
    this.RunActive.set(detection)
  }
}

