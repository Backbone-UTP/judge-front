import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

import type { ChallengeExampleDto } from '../../types/challenge.types';

@Component({
  selector: 'app-example-block',
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './example-block.html',
  styleUrl: './example-block.css',
})
export class ExampleBlock {
  readonly example = input.required<ChallengeExampleDto>();
  readonly index = input.required<number>();

  readonly trimmedExplanation = computed(() => this.example().explanation?.trim() ?? '');
}
