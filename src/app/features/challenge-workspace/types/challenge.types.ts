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

export interface ChallengeProblemDto {
  title: string;
  difficulty?: 'Easy' | 'Medium' | 'Hard';
  acceptanceCount?: number;
  engagement?: number;
  author?: string;
  descriptionParagraphs: string[];
  examples: ChallengeExampleDto[];
  constraints: ChallengeConstraintDto[];
  editorSnippet: string;
}
