import { inject, Injectable } from '@angular/core';
import { map, timer, type Observable } from 'rxjs';

import type {
  Activity,
  ActivityDay,
  Badge,
  Difficulty,
  Group,
  IsoDate,
  Leaderboard,
  LeaderboardEntry,
  LeaderboardQuery,
  Page,
  ProblemsQuery,
  ProblemSummary,
  ProfileSummary,
  ProfileUpdate,
  RecentSubmission,
  Season,
  SolvedByDifficulty,
  Streak,
  University,
} from '../types/progress.types';
import {
  BADGES,
  GROUPS,
  ME,
  PLAYERS,
  POINTS_BY_DIFFICULTY,
  POINTS_SPENT_ON_HINTS,
  PROBLEM_ROWS,
  RECENT_SUBMISSIONS,
  SEASON_ROWS,
  UNIVERSITIES,
  type PlayerRow,
} from './fake-progress.data';
import {
  CatalogRepository,
  FAKE_PROGRESS_OPTIONS,
  LeaderboardRepository,
  ProblemsRepository,
  ProfileRepository,
} from './progress.repositories';

const PAGE_SIZE = 20;
const LEADERBOARD_SIZE = 50;

const bogotaFormat = new Intl.DateTimeFormat('en-CA', {
  timeZone: 'America/Bogota',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
});

/** Calendar day of `date` in America/Bogota, as `YYYY-MM-DD`. */
export function bogotaDate(date: Date): IsoDate {
  return bogotaFormat.format(date);
}

/** `days` is oldest first and ends today. A day counts with one accepted submission. */
export function computeStreak(days: readonly ActivityDay[]): Streak {
  const counts = days.map((day) => day.acceptedCount);
  const activeToday = (counts.at(-1) ?? 0) > 0;

  let current = 0;
  for (
    let index = counts.length - (activeToday ? 1 : 2);
    index >= 0 && counts[index] > 0;
    index--
  ) {
    current++;
  }

  let best = 0;
  let run = 0;
  for (const count of counts) {
    run = count > 0 ? run + 1 : 0;
    best = Math.max(best, run);
  }

  return { current, best, activeToday };
}

const PROBLEMS: readonly ProblemSummary[] = PROBLEM_ROWS.map(
  ([title, difficulty, status, acceptanceRate]) => ({
    id: title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    title,
    difficulty,
    points: POINTS_BY_DIFFICULTY[difficulty],
    acceptanceRate,
    status,
  }),
);

/** Simulates the network: latency, an optional forced failure, and errors thrown by `compute`. */
abstract class FakeResource {
  protected readonly options = inject(FAKE_PROGRESS_OPTIONS);

  protected respond<T>(compute: () => T): Observable<T> {
    return timer(this.options.latencyMs).pipe(
      map(() => {
        if (this.options.fail) {
          throw new Error('NETWORK_ERROR');
        }
        return compute();
      }),
    );
  }

  protected seasons(): Season[] {
    const now = this.options.now().toISOString();
    const seasons = SEASON_ROWS.map((row) => ({
      ...row,
      active: row.startsAt <= now && now < row.endsAt,
    }));
    const active = seasons
      .filter((season) => season.active)
      .sort((a, b) => b.startsAt.localeCompare(a.startsAt));
    const closed = seasons
      .filter((season) => !season.active)
      .sort((a, b) => b.endsAt.localeCompare(a.endsAt));
    return [...active, ...closed];
  }

  // ponytail: ranks the whole player list on every call; fine for 61 fake players.
  protected rank(query: LeaderboardQuery, me: PlayerRow): LeaderboardEntry[] {
    const pointsOf = (player: PlayerRow) =>
      query.scope === 'season' ? (player.seasonPoints[query.seasonId ?? ''] ?? 0) : player.points;
    const groupOf = (player: PlayerRow) => GROUPS.find((group) => group.id === player.groupId);

    return [...PLAYERS, me]
      .filter((player) => query.scope === 'all-time' || pointsOf(player) > 0)
      .filter((player) => !query.groupId || player.groupId === query.groupId)
      .filter(
        (player) => !query.universityId || groupOf(player)?.universityId === query.universityId,
      )
      .sort((a, b) => pointsOf(b) - pointsOf(a))
      .map((player, index) => ({
        rank: index + 1,
        userId: player.userId,
        displayName: player.displayName,
        avatarUrl: null,
        groupName: groupOf(player)?.name ?? null,
        points: pointsOf(player),
        solvedCount: player.solvedCount,
      }));
  }
}

@Injectable()
export class FakeProblemsRepository extends FakeResource implements ProblemsRepository {
  list(query: ProblemsQuery): Observable<Page<ProblemSummary>> {
    return this.respond(() => {
      const search = query.search?.trim().toLowerCase() ?? '';
      const matches = PROBLEMS.filter(
        (problem) =>
          problem.title.toLowerCase().includes(search) &&
          (!query.difficulty || problem.difficulty === query.difficulty) &&
          (!query.status || problem.status === query.status),
      );
      const page = Math.max(1, query.page ?? 1);
      const start = (page - 1) * PAGE_SIZE;

      return {
        items: matches.slice(start, start + PAGE_SIZE),
        total: matches.length,
        page,
        pageSize: PAGE_SIZE,
      };
    });
  }

  getSolvedByDifficulty(): Observable<SolvedByDifficulty> {
    return this.respond(() => solvedByDifficulty());
  }
}

function solvedByDifficulty(): SolvedByDifficulty {
  const count = (difficulty: Difficulty) => {
    const all = PROBLEMS.filter((problem) => problem.difficulty === difficulty);
    return { solved: all.filter((p) => p.status === 'solved').length, total: all.length };
  };
  return { easy: count('easy'), medium: count('medium'), hard: count('hard') };
}

@Injectable()
export class FakeLeaderboardRepository extends FakeResource implements LeaderboardRepository {
  getSeasons(): Observable<readonly Season[]> {
    return this.respond(() => this.seasons());
  }

  getLeaderboard(query: LeaderboardQuery): Observable<Leaderboard> {
    return this.respond(() => {
      const seasons = this.seasons();
      const season =
        query.scope === 'all-time'
          ? null
          : ((query.seasonId === undefined
              ? seasons.find((candidate) => candidate.active)
              : seasons.find((candidate) => candidate.id === query.seasonId)) ?? null);

      if (query.scope === 'season' && !season) {
        throw new Error('SEASON_NOT_FOUND');
      }

      // ponytail: profile edits are not reflected here; each fake keeps its own state.
      const entries = this.rank({ ...query, seasonId: season?.id }, ME);
      const mine = entries.find((entry) => entry.userId === ME.userId);

      return {
        season,
        top: entries.slice(0, LEADERBOARD_SIZE),
        me: mine && mine.rank > LEADERBOARD_SIZE ? mine : null,
      };
    });
  }
}

@Injectable()
export class FakeCatalogRepository extends FakeResource implements CatalogRepository {
  getUniversities(): Observable<readonly University[]> {
    return this.respond(() => UNIVERSITIES);
  }

  getGroups(universityId: string): Observable<readonly Group[]> {
    return this.respond(() => GROUPS.filter((group) => group.universityId === universityId));
  }
}

@Injectable()
export class FakeProfileRepository extends FakeResource implements ProfileRepository {
  private me: PlayerRow = ME;
  private universityId: string | null = 'utp';

  getSummary(): Observable<ProfileSummary> {
    return this.respond(() => this.summary());
  }

  getActivity(): Observable<Activity> {
    return this.respond(() => {
      const days = activityDays(bogotaDate(this.options.now()));
      return { streak: computeStreak(days), days };
    });
  }

  getBadges(): Observable<readonly Badge[]> {
    return this.respond(() => BADGES);
  }

  getRecentSubmissions(): Observable<readonly RecentSubmission[]> {
    return this.respond(() => RECENT_SUBMISSIONS);
  }

  updateProfile(update: ProfileUpdate): Observable<ProfileSummary> {
    return this.respond(() => {
      const displayName = update.displayName.trim();
      if (displayName.length < 2 || displayName.length > 60) {
        throw new Error('INVALID_DISPLAY_NAME');
      }

      const group = GROUPS.find((candidate) => candidate.id === update.groupId);
      const university = UNIVERSITIES.find((candidate) => candidate.id === update.universityId);
      const groupIsValid = update.groupId === null || group?.universityId === update.universityId;
      if (!groupIsValid || (update.universityId !== null && !university)) {
        throw new Error('INVALID_GROUP');
      }

      this.me = { ...this.me, displayName, groupId: update.groupId ?? '' };
      this.universityId = update.universityId;
      return this.summary();
    });
  }

  private summary(): ProfileSummary {
    const allTime = this.rank({ scope: 'all-time' }, this.me);

    return {
      userId: this.me.userId,
      displayName: this.me.displayName,
      avatarUrl: null,
      university: UNIVERSITIES.find((university) => university.id === this.universityId) ?? null,
      group: GROUPS.find((group) => group.id === this.me.groupId) ?? null,
      points: { total: this.me.points, spentOnHints: POINTS_SPENT_ON_HINTS },
      allTimeRank: allTime.find((entry) => entry.userId === this.me.userId)?.rank ?? null,
      seasons: this.seasons()
        .filter((season) => season.active)
        .map((season) => {
          const entries = this.rank({ scope: 'season', seasonId: season.id }, this.me);
          return {
            season,
            points: this.me.seasonPoints[season.id] ?? 0,
            rank: entries.find((entry) => entry.userId === this.me.userId)?.rank ?? null,
            participants: entries.length,
          };
        }),
      solved: solvedByDifficulty(),
    };
  }
}

/**
 * 365 days ending `today`: no accepted submission yet today, a 12-day streak before it,
 * a 31-day best streak around three months ago, and scattered activity elsewhere.
 */
function activityDays(today: IsoDate): ActivityDay[] {
  const [year, month, day] = today.split('-').map(Number);

  return Array.from({ length: 365 }, (_, index) => {
    const daysAgo = 364 - index;
    const date = new Date(Date.UTC(year, month - 1, day - daysAgo)).toISOString().slice(0, 10);
    const scattered = ((daysAgo * 2654435761) >>> 0) % 7;
    const acceptedCount =
      daysAgo === 0 || daysAgo === 13 || daysAgo === 89 || daysAgo === 121
        ? 0
        : daysAgo <= 12
          ? 1 + (daysAgo % 3)
          : daysAgo >= 90 && daysAgo <= 120
            ? 1 + (daysAgo % 2)
            : scattered < 4
              ? 0
              : scattered - 3;
    return { date, acceptedCount };
  });
}
