import { Injectable, signal } from '@angular/core';
import { ExecutionStatus } from '../types/challenge.types/challenge.types';

@Injectable({
  providedIn: 'root',
})
export class ExecutionStateService {
  readonly status = signal<ExecutionStatus>('idle')

  setStatus(status: ExecutionStatus) {
    this.status.set(status);
  }

  reset() {
    this.status.set('idle');
  }
}
