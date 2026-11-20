// Contract shared by the problems, leaderboard and profile features (US-15).
// The backend implements the same shapes; discuss changes in the US-15 issue first.

/** ISO 8601 timestamp, for example `2026-11-19T15:04:05Z`. */
export type IsoDateTime = string;

/** Calendar day in America/Bogota, formatted `YYYY-MM-DD`. */
export type IsoDate = string;

export type Difficulty = 'easy' | 'medium' | 'hard';

export type ProblemStatus = 'solved' | 'attempted' | 'todo';

export interface Page<T> {
  items: readonly T[];
  total: number;
  /** 1-based. */
  page: number;
  pageSize: number;
}

export interface ProblemSummary {
  id: string;
  title: string;
  difficulty: Difficulty;
  /** Points the first accepted submission awards. */
  points: number;
  /** Accepted submissions over total submissions, from 0 to 1. */
  acceptanceRate: number;
  /** Relative to the signed-in user. */
  status: ProblemStatus;
}

export interface ProblemsQuery {
  /** Case-insensitive match on the title. */
  search?: string;
  difficulty?: Difficulty;
  status?: ProblemStatus;
  /** 1-based, defaults to 1. */
  page?: number;
}

export interface SolvedCount {
  solved: number;
  total: number;
}

export type SolvedByDifficulty = Readonly<Record<Difficulty, SolvedCount>>;

export type SeasonKind = 'semester' | 'competition' | 'holiday' | 'other';

export interface Season {
  id: string;
  name: string;
  kind: SeasonKind;
  startsAt: IsoDateTime;
  endsAt: IsoDateTime;
  active: boolean;
}

export type LeaderboardScope = 'season' | 'all-time';

export interface LeaderboardQuery {
  scope: LeaderboardScope;
  /** Only for the `season` scope. Defaults to the active season that started most recently. */
  seasonId?: string;
  universityId?: string;
  groupId?: string;
}

/** The only user data that is public. Profiles are private to their owner. */
export interface LeaderboardEntry {
  rank: number;
  userId: string;
  displayName: string;
  avatarUrl: string | null;
  groupName: string | null;
  points: number;
  solvedCount: number;
}

export interface Leaderboard {
  /** Season the ranking belongs to; `null` for the `all-time` scope. */
  season: Season | null;
  /** Up to 50 entries. */
  top: readonly LeaderboardEntry[];
  /** The signed-in user when ranked outside `top`; `null` when inside it or not ranked. */
  me: LeaderboardEntry | null;
}

export interface University {
  id: string;
  name: string;
}

export interface Group {
  id: string;
  universityId: string;
  name: string;
}

export interface SeasonScore {
  season: Season;
  points: number;
  /** `null` until the user has an accepted submission in the season. */
  rank: number | null;
  participants: number;
}

export interface ProfileSummary {
  userId: string;
  displayName: string;
  avatarUrl: string | null;
  university: University | null;
  group: Group | null;
  points: {
    total: number;
    spentOnHints: number;
  };
  allTimeRank: number | null;
  /** One entry per active season. */
  seasons: readonly SeasonScore[];
  solved: SolvedByDifficulty;
}

export interface ProfileUpdate {
  displayName: string;
  universityId: string | null;
  groupId: string | null;
}

export interface Streak {
  current: number;
  best: number;
  /** Whether today already counts, so the UI can nudge the user. */
  activeToday: boolean;
}

export interface ActivityDay {
  date: IsoDate;
  acceptedCount: number;
}

export interface Activity {
  streak: Streak;
  /** The last 365 days, oldest first. */
  days: readonly ActivityDay[];
}

export type BadgeKind = 'permanent' | 'season';

export interface Badge {
  code: string;
  name: string;
  description: string;
  kind: BadgeKind;
  /** Lucide icon name, for example `flame`. */
  icon: string;
  earnedAt: IsoDateTime | null;
  /** Season that awarded it, for season badges. */
  seasonName: string | null;
  /** Progress towards a numeric goal while locked. */
  progress: { current: number; goal: number } | null;
}

export type Verdict =
  | 'accepted'
  | 'wrong-answer'
  | 'time-limit'
  | 'runtime-error'
  | 'compile-error';

export interface RecentSubmission {
  id: string;
  problemId: string;
  problemTitle: string;
  verdict: Verdict;
  language: string;
  submittedAt: IsoDateTime;
}
