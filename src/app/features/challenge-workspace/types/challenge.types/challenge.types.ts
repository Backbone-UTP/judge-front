import { Component } from '@angular/core';

@Component({
  selector: 'app-challenge.types',
  imports: [],
  templateUrl: './challenge.types.html',
  styleUrl: './challenge.types.css',
})
export class ChallengeTypes {}

export type ExecutionStatus = 'idle' | 'running' | 'sucess' | 'error';

  export interface ExecutionResult {
    status: ExecutionStatus;
    message: string;
    output?: string;
  }