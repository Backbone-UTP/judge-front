import type { Difficulty, ProblemStatus } from '../../core/progress/types/progress.types';

export const DIFFICULTY_LABELS: Readonly<Record<Difficulty, string>> = {
  easy: 'Easy',
  medium: 'Medium',
  hard: 'Hard',
};

export const STATUS_LABELS: Readonly<Record<ProblemStatus, string>> = {
  solved: 'Solved',
  attempted: 'Attempted',
  todo: 'To do',
};
