import { Component, inject, signal } from '@angular/core';
import { ExecutionStateService } from '../../services/execution-state.service';
import { ExecutionResult } from '../../types/challenge.types/challenge.types';
import { __values } from 'tslib';

@Component({
  selector: 'app-results-panel',
  imports: [],
  templateUrl: './results-panel.html',
  styleUrl: './results-panel.css',
})
export class ResultsPanel {
  executionState = inject(ExecutionStateService);
  readonly cases = [1,2,3,4];
  result = signal<ExecutionResult>({
  message: '',
  output: ''
});
  collapsed = signal(false);
  togglepanel() {
    this.collapsed.update(value => !value);
  }
}