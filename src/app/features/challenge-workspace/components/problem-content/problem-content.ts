import { Component } from '@angular/core';
import example from '../../fixtures/two-sum.challenge.json'

@Component({
  selector: 'app-problem-content',
  imports: [],
  templateUrl: './problem-content.html',
  styleUrl: './problem-content.css',
})
export class ProblemContent {
  example = example
}
