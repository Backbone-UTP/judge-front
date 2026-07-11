import { Component, input, output } from '@angular/core';
import { ResultsPanel } from '../../components/results-panel/results-panel';
import { ExecutionResult } from '../../types/challenge.types/challenge.types';
@Component({
  selector: 'app-challenge-execution',
  imports: [ResultsPanel],
  templateUrl: './challenge-execution.service.html',
  styleUrl: './challenge-execution.service.css',
})
export class ChallengeExecutionService {
  readonly RunActive = input<string>()
  onRunCodeClicker=output<string>()
    RunCodeClicker(click:string){
      console.log(click)
      this.onRunCodeClicker.emit(click)
    }

}
