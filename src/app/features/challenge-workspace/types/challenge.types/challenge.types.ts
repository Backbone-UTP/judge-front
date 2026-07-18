import { Component } from '@angular/core';

@Component({
  selector: 'app-challenge.types',
  imports: [],
  templateUrl: './challenge.types.html',
  styleUrl: './challenge.types.css',
})
export class ChallengeTypes {}

export type ExecutionStatus = 'idle' | 'running' | 'success' | 'error';

  export interface ExecutionResult {
    message: string;
    output?: string;
  }