import { InjectionToken } from '@angular/core';
import type { Observable } from 'rxjs';

import type {
  Activity,
  Badge,
  Group,
  Leaderboard,
  LeaderboardQuery,
  Page,
  ProblemsQuery,
  ProblemSummary,
  ProfileSummary,
  ProfileUpdate,
  RecentSubmission,
  Season,
  SolvedByDifficulty,
  University,
} from '../types/progress.types';

export abstract class ProblemsRepository {
  /** Pages of 20, filtered by `query`. */
  abstract list(query: ProblemsQuery): Observable<Page<ProblemSummary>>;

  abstract getSolvedByDifficulty(): Observable<SolvedByDifficulty>;
}

export abstract class LeaderboardRepository {
  /** Active seasons first (latest start first), then closed ones (latest end first). */
  abstract getSeasons(): Observable<readonly Season[]>;

  /** Fails with `SEASON_NOT_FOUND` for an unknown `seasonId`. */
  abstract getLeaderboard(query: LeaderboardQuery): Observable<Leaderboard>;
}

export abstract class CatalogRepository {
  abstract getUniversities(): Observable<readonly University[]>;

  abstract getGroups(universityId: string): Observable<readonly Group[]>;
}

/** Data of the signed-in user only. */
export abstract class ProfileRepository {
  abstract getSummary(): Observable<ProfileSummary>;

  abstract getActivity(): Observable<Activity>;

  abstract getBadges(): Observable<readonly Badge[]>;

  /** The last 5 submissions, newest first. */
  abstract getRecentSubmissions(): Observable<readonly RecentSubmission[]>;

  /** Fails with `INVALID_DISPLAY_NAME` or `INVALID_GROUP`. */
  abstract updateProfile(update: ProfileUpdate): Observable<ProfileSummary>;
}

export interface FakeProgressOptions {
  /** Simulated network latency. */
  latencyMs: number;
  /** Make every call fail with `NETWORK_ERROR`, to build error states. */
  fail: boolean;
  /** Clock used for active seasons and streaks. */
  now: () => Date;
}

export const FAKE_PROGRESS_OPTIONS = new InjectionToken<FakeProgressOptions>(
  'FAKE_PROGRESS_OPTIONS',
  { factory: () => ({ latencyMs: 300, fail: false, now: () => new Date() }) },
);
