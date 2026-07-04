import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import type { ChallengeProblemDto } from '../../types/challenge.types';

@Component({
  selector: 'app-challenge-header',
  standalone: true,
  imports: [],
  templateUrl: './challenge-header.html',
  styleUrl: './challenge-header.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChallengeHeader {
  readonly challenge = input.required<ChallengeProblemDto>();

  formatCount(value?: number): string {
    if (value === null || value === undefined) {
      return '—';
    }
    if (value >= 1_000_000) {
      return `${(value / 1_000_000).toFixed(1)}M`;
    }

    if (value >= 1_000) {
      return `${(value / 1_000).toFixed(1)}K`;
    }
    return value.toString();
  }
}
