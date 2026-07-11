import { Component, input } from '@angular/core';
import { ExecutionResult } from '../../types/challenge.types/challenge.types';

@Component({
  selector: 'app-results-panel',
  imports: [],
  templateUrl: './results-panel.html',
  styleUrl: './results-panel.css',
})
export class ResultsPanel {
  readonly result = input.required<ExecutionResult>()
}
