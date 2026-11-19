export type LanguageId = 'javascript' | 'python';

// ponytail: generic starters shared by every problem; move them into the problem DTO
// once problems come from the backend with their own signatures.
export const starterCodeByLanguage: Record<LanguageId, string> = {
  javascript: 'function solve(input) {\n  // Write your solution here\n}\n',
  python: 'def solve(input):\n    # Write your solution here\n    pass\n',
};

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
  descriptionParagraphs: string[];
  examples: ChallengeExampleDto[];
  constraints: ChallengeConstraintDto[];
  editorSnippet: string;
}
