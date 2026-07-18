import { TestBed } from '@angular/core/testing';

import { ExecutionStateService } from './execution-state.service';

describe('ExecutionStateService', () => {
  let service: ExecutionStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExecutionStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
