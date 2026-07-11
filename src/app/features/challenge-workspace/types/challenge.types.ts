export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export interface ProblemMeta {
  difficulty?: Difficulty;
  acceptanceCount?: number;
  engagement?: number;
  author?: string;
}

export interface ChallengeExampleDto {
  input: string;
  output: string;
  explanation?: string;
}

export type ChallengeConstraintDto =
  | {
      kind: 'boundedRange';
      lower: string;
      middle: string;
      upper: string;
    }
  | {
      kind: 'text';
      text: string;
    };

export interface ChallengeProblemDto extends ProblemMeta {
  title: string;
  descriptionParagraphs: string[];
  examples: ChallengeExampleDto[];
  constraints: ChallengeConstraintDto[];
  editorSnippet: string;
}
