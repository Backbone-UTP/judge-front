import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExampleBlock } from '../example-block/example-block';
import { ConstraintsList } from '../constraints-list/constraints-list';
import type { ChallengeProblemDto } from '../../types/challenge.types';

@Component({
  selector: 'app-problem-content',
  standalone: true,
  imports: [CommonModule, ExampleBlock, ConstraintsList],
  templateUrl: './problem-content.html',
  styleUrls: ['./problem-content.css'],
})
export class ProblemContent {
  readonly challenge = input.required<ChallengeProblemDto>();
}
