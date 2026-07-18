import { Component, input, output, inject } from '@angular/core';
import { ExecutionStateService } from '../execution-state.service';
import { ExecutionResult } from '../../types/challenge.types/challenge.types';
@Component({
  selector: 'app-challenge-execution',
  imports: [],
  templateUrl: './challenge-execution.service.html',
  styleUrl: './challenge-execution.service.css',
})
export class ChallengeExecutionService {
  executionState = inject(ExecutionStateService);

  runCode(){
    this.executionState.setStatus('running')
  }

}
