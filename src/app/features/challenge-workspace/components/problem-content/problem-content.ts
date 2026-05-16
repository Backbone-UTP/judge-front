import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import challengeData from '../../fixtures/two-sum.challenge.json';
import { ExampleBlock } from '../example-block/example-block';
import { ConstraintsList } from '../constraints-list/constraints-list';
import type { ChallengeExampleDto, ChallengeConstraintDto } from '../../types/challenge.types';

@Component({
  selector: 'app-problem-content',
  standalone: true,
  imports: [CommonModule, ExampleBlock, ConstraintsList],
  templateUrl: './problem-content.html',
  styleUrls: ['./problem-content.css'],
})
export class ProblemContent {
  readonly challenge = challengeData as {
    title: string;
    descriptionParagraphs: string[];
    examples: ChallengeExampleDto[];
    constraints: ChallengeConstraintDto[];
    editorSnippet?: string;
  };
}
