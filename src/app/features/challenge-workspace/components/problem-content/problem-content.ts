import { Component } from '@angular/core';
import example from '../../fixtures/two-sum.challenge.json';

@Component({
  selector: 'app-problem-content',
  standalone: true,
  imports: [],
  templateUrl: './problem-content.html',
  styleUrl: './problem-content.css',
})
export class ProblemContent {
  protected readonly example = example;
}
