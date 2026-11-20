import { TestBed } from '@angular/core/testing';
import { firstValueFrom, type Observable } from 'rxjs';

import type { ActivityDay } from '../types/progress.types';
import {
  bogotaDate,
  computeStreak,
  FakeCatalogRepository,
  FakeLeaderboardRepository,
  FakeProblemsRepository,
  FakeProfileRepository,
} from './fake-progress.repositories';
import { FAKE_PROGRESS_OPTIONS, type FakeProgressOptions } from './progress.repositories';

const NOW = new Date('2026-11-19T15:00:00Z');

function setup(options: Partial<FakeProgressOptions> = {}) {
  TestBed.configureTestingModule({
    providers: [
      FakeProblemsRepository,
      FakeLeaderboardRepository,
      FakeCatalogRepository,
      FakeProfileRepository,
      {
        provide: FAKE_PROGRESS_OPTIONS,
        useValue: { latencyMs: 0, fail: false, now: () => NOW, ...options },
      },
    ],
  });
}

const errorOf = (source: Observable<unknown>) =>
  firstValueFrom(source).then(
    () => 'no error',
    (error: Error) => error.message,
  );

describe('FakeProblemsRepository', () => {
  let repository: FakeProblemsRepository;

  beforeEach(() => {
    setup();
    repository = TestBed.inject(FakeProblemsRepository);
  });

  it('should return the first page of 20 by default', async () => {
    const page = await firstValueFrom(repository.list({}));

    expect(page.page).toBe(1);
    expect(page.pageSize).toBe(20);
    expect(page.items.length).toBe(20);
    expect(page.total).toBeGreaterThan(40);
  });

  it('should match the title case-insensitively, ignoring surrounding spaces', async () => {
    const page = await firstValueFrom(repository.list({ search: '  two SUM ' }));

    expect(page.items.map((problem) => problem.title)).toEqual(['Two Sum']);
    expect(page.total).toBe(1);
  });

  it('should combine the difficulty and status filters', async () => {
    const page = await firstValueFrom(repository.list({ difficulty: 'medium', status: 'solved' }));

    expect(page.total).toBeGreaterThan(0);
    expect(page.items.length).toBe(page.total);
    expect(
      page.items.every((problem) => problem.difficulty === 'medium' && problem.status === 'solved'),
    ).toBe(true);
  });

  it('should return the remaining problems on the last page and none past it', async () => {
    const { total } = await firstValueFrom(repository.list({}));
    const lastPage = Math.ceil(total / 20);

    const last = await firstValueFrom(repository.list({ page: lastPage }));
    const past = await firstValueFrom(repository.list({ page: lastPage + 1 }));

    expect(last.items.length).toBe(total - (lastPage - 1) * 20);
    expect(past.items).toEqual([]);
    expect(past.total).toBe(total);
  });

  it('should count solved problems per difficulty from the same data', async () => {
    const solved = await firstValueFrom(repository.getSolvedByDifficulty());

    for (const difficulty of ['easy', 'medium', 'hard'] as const) {
      const all = await firstValueFrom(repository.list({ difficulty }));
      const done = await firstValueFrom(repository.list({ difficulty, status: 'solved' }));

      expect(solved[difficulty]).toEqual({ solved: done.total, total: all.total });
    }
  });

  it('should fail with NETWORK_ERROR when the fail option is on', async () => {
    TestBed.resetTestingModule();
    setup({ fail: true });

    const message = await errorOf(TestBed.inject(FakeProblemsRepository).list({}));

    expect(message).toBe('NETWORK_ERROR');
  });
});

describe('FakeLeaderboardRepository', () => {
  let repository: FakeLeaderboardRepository;

  beforeEach(() => {
    setup();
    repository = TestBed.inject(FakeLeaderboardRepository);
  });

  it('should list active seasons first by latest start, then closed ones by latest end', async () => {
    const seasons = await firstValueFrom(repository.getSeasons());

    const active = seasons.filter((season) => season.active);
    const closed = seasons.filter((season) => !season.active);

    expect(active.length).toBeGreaterThan(1);
    expect(seasons.slice(0, active.length)).toEqual(active);
    expect(active.map((s) => s.startsAt)).toEqual(
      active
        .map((s) => s.startsAt)
        .sort()
        .reverse(),
    );
    expect(closed.map((s) => s.endsAt)).toEqual(
      closed
        .map((s) => s.endsAt)
        .sort()
        .reverse(),
    );
  });

  it('should default the season scope to the active season that started most recently', async () => {
    const [latestActive] = await firstValueFrom(repository.getSeasons());

    const board = await firstValueFrom(repository.getLeaderboard({ scope: 'season' }));

    expect(board.season).toEqual(latestActive);
  });

  it('should fail with SEASON_NOT_FOUND for an unknown season', async () => {
    const message = await errorOf(
      repository.getLeaderboard({ scope: 'season', seasonId: 'missing' }),
    );

    expect(message).toBe('SEASON_NOT_FOUND');
  });

  it('should rank all-time by points, capped at 50, with no season', async () => {
    const board = await firstValueFrom(repository.getLeaderboard({ scope: 'all-time' }));

    expect(board.season).toBeNull();
    expect(board.top.length).toBe(50);
    expect(board.top.map((entry) => entry.rank)).toEqual(board.top.map((_, index) => index + 1));
    expect(board.top.map((entry) => entry.points)).toEqual(
      board.top.map((entry) => entry.points).sort((a, b) => b - a),
    );
  });

  it('should return the signed-in user apart only when ranked outside the top', async () => {
    const global = await firstValueFrom(repository.getLeaderboard({ scope: 'all-time' }));
    const group = await firstValueFrom(
      repository.getLeaderboard({ scope: 'all-time', groupId: 'utp-sis-g3' }),
    );

    expect(global.me?.rank).toBeGreaterThan(50);
    expect(global.top.some((entry) => entry.userId === global.me?.userId)).toBe(false);
    expect(group.me).toBeNull();
    expect(group.top.some((entry) => entry.userId === global.me?.userId)).toBe(true);
  });

  it('should filter by group and restart ranks at 1', async () => {
    const board = await firstValueFrom(
      repository.getLeaderboard({ scope: 'all-time', groupId: 'utp-sis-g3' }),
    );

    expect(board.top.length).toBeGreaterThan(0);
    expect(board.top.every((entry) => entry.groupName === 'Ing. Sistemas · G3')).toBe(true);
    expect(board.top[0].rank).toBe(1);
  });
});

describe('FakeCatalogRepository', () => {
  it('should list only the groups of the requested university', async () => {
    setup();
    const repository = TestBed.inject(FakeCatalogRepository);
    const [first, second] = await firstValueFrom(repository.getUniversities());

    const groups = await firstValueFrom(repository.getGroups(first.id));
    const others = await firstValueFrom(repository.getGroups(second.id));

    expect(groups.length).toBeGreaterThan(0);
    expect(groups.every((group) => group.universityId === first.id)).toBe(true);
    expect(others.every((group) => group.universityId === second.id)).toBe(true);
  });
});

describe('FakeProfileRepository', () => {
  let repository: FakeProfileRepository;

  beforeEach(() => {
    setup();
    repository = TestBed.inject(FakeProfileRepository);
  });

  it('should return 365 days ending today in Bogota, with a matching streak', async () => {
    const activity = await firstValueFrom(repository.getActivity());

    expect(activity.days.length).toBe(365);
    expect(activity.days.at(-1)?.date).toBe('2026-11-19');
    expect(activity.streak).toEqual(computeStreak(activity.days));
  });

  it('should save a valid profile and return it on the next read', async () => {
    const updated = await firstValueFrom(
      repository.updateProfile({
        displayName: '  Ana Gómez ',
        universityId: 'utp',
        groupId: 'utp-sis-g1',
      }),
    );
    const summary = await firstValueFrom(repository.getSummary());

    expect(updated.displayName).toBe('Ana Gómez');
    expect(updated.group?.id).toBe('utp-sis-g1');
    expect(summary).toEqual(updated);
  });

  it('should reject names outside 2 to 60 characters', async () => {
    const base = { universityId: 'utp', groupId: 'utp-sis-g3' };

    expect(await errorOf(repository.updateProfile({ ...base, displayName: ' a ' }))).toBe(
      'INVALID_DISPLAY_NAME',
    );
    expect(await errorOf(repository.updateProfile({ ...base, displayName: 'x'.repeat(61) }))).toBe(
      'INVALID_DISPLAY_NAME',
    );
  });

  it('should reject a group from another university', async () => {
    const message = await errorOf(
      repository.updateProfile({ displayName: 'Ana', universityId: 'uam', groupId: 'utp-sis-g1' }),
    );

    expect(message).toBe('INVALID_GROUP');
  });

  it('should return the last 5 submissions, newest first', async () => {
    const submissions = await firstValueFrom(repository.getRecentSubmissions());

    expect(submissions.length).toBe(5);
    expect(submissions.map((s) => s.submittedAt)).toEqual(
      submissions
        .map((s) => s.submittedAt)
        .sort()
        .reverse(),
    );
  });

  it('should return earned and locked badges of both kinds', async () => {
    const badges = await firstValueFrom(repository.getBadges());

    expect(new Set(badges.map((badge) => badge.kind))).toEqual(new Set(['permanent', 'season']));
    expect(badges.some((badge) => badge.earnedAt === null)).toBe(true);
    expect(badges.some((badge) => badge.earnedAt !== null)).toBe(true);
  });
});

describe('streak helpers', () => {
  const days = (counts: number[]): ActivityDay[] =>
    counts.map((acceptedCount, index) => ({ date: `2026-01-${index + 1}`, acceptedCount }));

  it('should resolve the day in Bogota, not UTC', () => {
    expect(bogotaDate(new Date('2026-11-20T03:00:00Z'))).toBe('2026-11-19');
  });

  it('should count today when it already has an accepted submission', () => {
    expect(computeStreak(days([0, 1, 2, 1]))).toEqual({ current: 3, best: 3, activeToday: true });
  });

  it('should keep the streak alive until today ends', () => {
    expect(computeStreak(days([1, 1, 0, 2, 1, 0]))).toEqual({
      current: 2,
      best: 2,
      activeToday: false,
    });
  });

  it('should reset after a full day without accepted submissions', () => {
    expect(computeStreak(days([1, 1, 1, 0, 0]))).toEqual({
      current: 0,
      best: 3,
      activeToday: false,
    });
  });
});
