import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApplicationService {
  increment(value: number): number {
    return value + 1;
  }
}
