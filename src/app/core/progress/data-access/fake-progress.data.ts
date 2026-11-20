import type {
  Badge,
  Difficulty,
  Group,
  ProblemStatus,
  RecentSubmission,
  SeasonKind,
  University,
} from '../types/progress.types';

export const POINTS_BY_DIFFICULTY: Readonly<Record<Difficulty, number>> = {
  easy: 10,
  medium: 25,
  hard: 50,
};

type ProblemRow = [
  title: string,
  difficulty: Difficulty,
  status: ProblemStatus,
  acceptance: number,
];

export const PROBLEM_ROWS: readonly ProblemRow[] = [
  ['Two Sum', 'easy', 'solved', 0.492],
  ['Valid Parentheses', 'easy', 'solved', 0.408],
  ['Merge Intervals', 'medium', 'attempted', 0.461],
  ['Longest Substring Without Repeating Characters', 'medium', 'todo', 0.338],
  ['Binary Tree Level Order Traversal', 'medium', 'solved', 0.64],
  ['Trapping Rain Water', 'hard', 'todo', 0.593],
  ['Coin Change', 'medium', 'attempted', 0.425],
  ['Median of Two Sorted Arrays', 'hard', 'todo', 0.379],
  ['Climbing Stairs', 'easy', 'solved', 0.521],
  ['Word Ladder', 'hard', 'todo', 0.384],
  ['Reverse Linked List', 'easy', 'solved', 0.735],
  ['Maximum Subarray', 'medium', 'solved', 0.497],
  ['Best Time to Buy and Sell Stock', 'easy', 'solved', 0.538],
  ['Group Anagrams', 'medium', 'todo', 0.66],
  ['Number of Islands', 'medium', 'solved', 0.572],
  ['Course Schedule', 'medium', 'todo', 0.459],
  ['Merge Two Sorted Lists', 'easy', 'solved', 0.62],
  ['Product of Array Except Self', 'medium', 'attempted', 0.651],
  ['Serialize and Deserialize Binary Tree', 'hard', 'todo', 0.553],
  ['Kth Largest Element in an Array', 'medium', 'todo', 0.658],
  ['Linked List Cycle', 'easy', 'solved', 0.488],
  ['Palindrome Number', 'easy', 'todo', 0.553],
  ['Rotate Image', 'medium', 'solved', 0.716],
  ['Edit Distance', 'medium', 'todo', 0.562],
  ['Minimum Window Substring', 'hard', 'attempted', 0.417],
  ['Valid Anagram', 'easy', 'solved', 0.634],
  ['Search in Rotated Sorted Array', 'medium', 'todo', 0.398],
  ['Longest Palindromic Substring', 'medium', 'todo', 0.332],
  ['N-Queens', 'hard', 'solved', 0.664],
  ['Binary Search', 'easy', 'solved', 0.567],
  ['Top K Frequent Elements', 'medium', 'todo', 0.623],
  ['Merge k Sorted Lists', 'hard', 'todo', 0.517],
  ['Same Tree', 'easy', 'todo', 0.598],
  ['Jump Game', 'medium', 'todo', 0.384],
  ['Largest Rectangle in Histogram', 'hard', 'todo', 0.441],
  ['Invert Binary Tree', 'easy', 'solved', 0.757],
  ['Unique Paths', 'medium', 'todo', 0.631],
  ['Regular Expression Matching', 'hard', 'todo', 0.283],
  ['Majority Element', 'easy', 'todo', 0.643],
  ['Daily Temperatures', 'medium', 'todo', 0.665],
  ['Sliding Window Maximum', 'hard', 'solved', 0.465],
  ['Missing Number', 'easy', 'solved', 0.641],
  ['Decode Ways', 'medium', 'todo', 0.336],
  ['Word Search II', 'hard', 'todo', 0.366],
  ['Fizz Buzz', 'easy', 'solved', 0.721],
];

export const UNIVERSITIES: readonly University[] = [
  { id: 'utp', name: 'Universidad Tecnológica de Pereira' },
  { id: 'uam', name: 'Universidad Autónoma de Manizales' },
];

export const GROUPS: readonly Group[] = [
  { id: 'utp-sis-g1', universityId: 'utp', name: 'Ing. Sistemas · G1' },
  { id: 'utp-sis-g2', universityId: 'utp', name: 'Ing. Sistemas · G2' },
  { id: 'utp-sis-g3', universityId: 'utp', name: 'Ing. Sistemas · G3' },
  { id: 'utp-ele-g1', universityId: 'utp', name: 'Ing. Electrónica · G1' },
  { id: 'utp-ind-g1', universityId: 'utp', name: 'Ing. Industrial · G1' },
  { id: 'uam-sis-g1', universityId: 'uam', name: 'Ing. Sistemas · G1' },
];

export interface SeasonRow {
  id: string;
  name: string;
  kind: SeasonKind;
  startsAt: string;
  endsAt: string;
}

export const SEASON_ROWS: readonly SeasonRow[] = [
  {
    id: 'semester-2026-1',
    name: 'Semestre 2026-1',
    kind: 'semester',
    startsAt: '2026-02-02T05:00:00Z',
    endsAt: '2026-06-13T05:00:00Z',
  },
  {
    id: 'hackathon-2026',
    name: 'Hackatón Backbone 2026',
    kind: 'competition',
    startsAt: '2026-05-08T05:00:00Z',
    endsAt: '2026-05-10T05:00:00Z',
  },
  {
    id: 'semester-2026-2',
    name: 'Semestre 2026-2',
    kind: 'semester',
    startsAt: '2026-07-27T05:00:00Z',
    endsAt: '2026-12-12T05:00:00Z',
  },
  {
    id: 'engineering-week-2026',
    name: 'Semana de la Ingeniería 2026',
    kind: 'competition',
    startsAt: '2026-11-16T05:00:00Z',
    endsAt: '2026-11-23T05:00:00Z',
  },
];

export interface PlayerRow {
  userId: string;
  displayName: string;
  groupId: string;
  points: number;
  solvedCount: number;
  seasonPoints: Readonly<Record<string, number>>;
}

/** Matches `fake-auth.repository.ts`, so the signed-in demo user is the profile owner. */
export const ME: PlayerRow = {
  userId: 'student-001',
  displayName: 'Backbone Student',
  groupId: 'utp-sis-g3',
  points: 1240,
  solvedCount: 23,
  seasonPoints: { 'semester-2026-1': 210, 'semester-2026-2': 340, 'engineering-week-2026': 85 },
};

export const POINTS_SPENT_ON_HINTS = 30;

const FIRST_NAMES = [
  'Valentina',
  'Mateo',
  'Sara',
  'Juan Pablo',
  'Camila',
  'Andrés',
  'Laura',
  'Santiago',
];
const LAST_NAMES = ['Ríos', 'Gómez', 'Londoño', 'Arias', 'Herrera', 'Castaño', 'Ospina', 'Mejía'];

// 56 players above ME (so ME ranks 57th all-time) and 4 below.
export const PLAYERS: readonly PlayerRow[] = Array.from({ length: 60 }, (_, index) => {
  const points = index < 56 ? 1240 + (56 - index) * 20 : 1240 - (index - 55) * 20;
  return {
    userId: `student-${String(index + 100)}`,
    displayName: `${FIRST_NAMES[index % 8]} ${LAST_NAMES[Math.floor(index / 8) % 8]}`,
    groupId: GROUPS[index % GROUPS.length].id,
    points,
    solvedCount: Math.round(points / 30),
    seasonPoints: {
      'semester-2026-1': index % 3 === 0 ? 0 : 520 - index * 6,
      'hackathon-2026': index % 4 === 0 ? 180 - index : 0,
      'semester-2026-2': 600 - index * 7,
      'engineering-week-2026': index % 5 === 0 ? 0 : 420 - index * 5,
    },
  };
});

export const RECENT_SUBMISSIONS: readonly RecentSubmission[] = [
  {
    id: 'sub-205',
    problemId: 'two-sum',
    problemTitle: 'Two Sum',
    verdict: 'accepted',
    language: 'javascript',
    submittedAt: '2026-11-18T22:10:00Z',
  },
  {
    id: 'sub-204',
    problemId: 'coin-change',
    problemTitle: 'Coin Change',
    verdict: 'wrong-answer',
    language: 'python',
    submittedAt: '2026-11-18T19:42:00Z',
  },
  {
    id: 'sub-203',
    problemId: 'merge-intervals',
    problemTitle: 'Merge Intervals',
    verdict: 'time-limit',
    language: 'javascript',
    submittedAt: '2026-11-17T23:05:00Z',
  },
  {
    id: 'sub-202',
    problemId: 'binary-tree-level-order-traversal',
    problemTitle: 'Binary Tree Level Order Traversal',
    verdict: 'accepted',
    language: 'python',
    submittedAt: '2026-11-16T21:30:00Z',
  },
  {
    id: 'sub-201',
    problemId: 'climbing-stairs',
    problemTitle: 'Climbing Stairs',
    verdict: 'accepted',
    language: 'javascript',
    submittedAt: '2026-11-15T16:18:00Z',
  },
];

const permanent = (
  code: string,
  name: string,
  icon: string,
  earnedAt: string | null,
  progress: Badge['progress'] = null,
): Badge => ({
  code,
  name,
  description: earnedAt ? 'Earned' : 'Locked',
  kind: 'permanent',
  icon,
  earnedAt,
  seasonName: null,
  progress,
});

export const BADGES: readonly Badge[] = [
  permanent('first-accepted', 'First Accepted', 'footprints', '2026-03-03T15:00:00Z'),
  permanent('solved-10', '10 Solved', 'target', '2026-04-18T15:00:00Z'),
  permanent('first-hard', 'First Hard', 'mountain', '2026-09-09T15:00:00Z'),
  permanent('streak-7', '7-day Streak', 'flame', '2026-05-02T15:00:00Z'),
  permanent('streak-30', '30-day Streak', 'flame', '2026-08-21T15:00:00Z'),
  permanent('solved-50', '50 Solved', 'medal', null, { current: 23, goal: 50 }),
  permanent('solved-100', '100 Solved', 'trophy', null, { current: 23, goal: 100 }),
  permanent('streak-100', '100-day Streak', 'flame', null, { current: 12, goal: 100 }),
  {
    code: 'season-participant',
    name: 'Participant',
    description: 'At least one accepted submission in the season',
    kind: 'season',
    icon: 'flag',
    earnedAt: '2026-06-13T05:00:00Z',
    seasonName: 'Semestre 2026-1',
    progress: null,
  },
  {
    code: 'season-top-10',
    name: 'Top 10',
    description: 'Awarded when a season closes',
    kind: 'season',
    icon: 'award',
    earnedAt: null,
    seasonName: null,
    progress: null,
  },
  {
    code: 'season-top-3',
    name: 'Top 3',
    description: 'Awarded when a season closes',
    kind: 'season',
    icon: 'award',
    earnedAt: null,
    seasonName: null,
    progress: null,
  },
  {
    code: 'season-top-1',
    name: 'Top 1',
    description: 'Awarded when a season closes',
    kind: 'season',
    icon: 'crown',
    earnedAt: null,
    seasonName: null,
    progress: null,
  },
];
