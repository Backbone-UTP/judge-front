import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';

import { FakeProblemsRepository } from '../../../../core/progress/data-access/fake-progress.repositories';
import {
  FAKE_PROGRESS_OPTIONS,
  ProblemsRepository,
  type FakeProgressOptions,
} from '../../../../core/progress/data-access/progress.repositories';
import { ProblemsPage } from './problems-page';

async function render(url = '/problems', options: Partial<FakeProgressOptions> = {}) {
  TestBed.configureTestingModule({
    providers: [
      provideRouter([
        { path: 'problems', component: ProblemsPage },
        { path: 'challenge-workspace', children: [] },
      ]),
      { provide: ProblemsRepository, useClass: FakeProblemsRepository },
      {
        provide: FAKE_PROGRESS_OPTIONS,
        useValue: { latencyMs: 0, fail: false, now: () => new Date(), ...options },
      },
    ],
  });
  const harness = await RouterTestingHarness.create();
  await harness.navigateByUrl(url, ProblemsPage);
  await settle(harness);
  return harness;
}

async function settle(harness: RouterTestingHarness) {
  await harness.fixture.whenStable();
  harness.detectChanges();
}

const root = (harness: RouterTestingHarness) => harness.routeNativeElement as HTMLElement;
const rows = (harness: RouterTestingHarness) =>
  Array.from(root(harness).querySelectorAll<HTMLTableRowElement>('tbody tr'));
const cellText = (row: HTMLTableRowElement, index: number) =>
  row.cells[index].textContent?.trim() ?? '';
const buttonNamed = (harness: RouterTestingHarness, name: string) =>
  Array.from(root(harness).querySelectorAll('button')).find(
    (button) => button.textContent?.trim() === name,
  ) as HTMLButtonElement;
const queryParams = () => TestBed.inject(Router).routerState.snapshot.root.queryParams;

describe('ProblemsPage', () => {
  it('should list the first 20 problems with difficulty, points and acceptance', async () => {
    const harness = await render();

    const [first] = rows(harness);
    expect(rows(harness).length).toBe(20);
    expect(cellText(first, 1)).toBe('Two Sum');
    expect(cellText(first, 2)).toBe('Easy');
    expect(cellText(first, 3)).toBe('+10');
    expect(cellText(first, 4)).toBe('49.2%');
  });

  it('should show solved counts per difficulty in the header', async () => {
    const harness = await render();

    const easy = root(harness).querySelector('[data-difficulty="easy"]');
    expect(easy?.textContent?.replace(/\s+/g, ' ').trim()).toBe('12/15 Easy');
  });

  it('should read the filters from the query params', async () => {
    const harness = await render('/problems?difficulty=hard&status=todo');

    expect(rows(harness).length).toBeGreaterThan(0);
    expect(rows(harness).every((row) => cellText(row, 2) === 'Hard')).toBe(true);
    expect(buttonNamed(harness, 'Hard').getAttribute('aria-pressed')).toBe('true');
    expect(root(harness).querySelector('select')?.value).toBe('todo');
  });

  it('should ignore invalid query params', async () => {
    const harness = await render('/problems?difficulty=extreme&status=done&page=abc');

    expect(rows(harness).length).toBe(20);
    expect(buttonNamed(harness, 'All').getAttribute('aria-pressed')).toBe('true');
  });

  it('should put the difficulty in the URL and go back to the first page', async () => {
    const harness = await render('/problems?page=2');

    buttonNamed(harness, 'Medium').click();
    await settle(harness);

    expect(queryParams()).toEqual({ difficulty: 'medium' });
    expect(rows(harness).every((row) => cellText(row, 2) === 'Medium')).toBe(true);
  });

  it('should search by title after the user stops typing', async () => {
    const harness = await render();
    const input = root(harness).querySelector<HTMLInputElement>('input[type="search"]')!;

    input.value = 'tree';
    input.dispatchEvent(new Event('input'));
    await new Promise((resolve) => setTimeout(resolve, 350));
    await settle(harness);

    expect(queryParams()).toEqual({ search: 'tree' });
    expect(rows(harness).every((row) => cellText(row, 1).toLowerCase().includes('tree'))).toBe(
      true,
    );
  });

  it('should move between pages and report the visible range', async () => {
    const harness = await render();

    buttonNamed(harness, 'Next').click();
    await settle(harness);

    expect(queryParams()).toEqual({ page: '2' });
    expect(root(harness).querySelector('.pagination-summary')?.textContent?.trim()).toBe(
      'Showing 21–40 of 45 problems',
    );
  });

  it('should offer to clear the filters when nothing matches', async () => {
    const harness = await render('/problems?search=zzz');

    expect(rows(harness).length).toBe(0);
    expect(root(harness).textContent).toContain('No problems match these filters.');

    buttonNamed(harness, 'Clear filters').click();
    await settle(harness);

    expect(queryParams()).toEqual({});
    expect(rows(harness).length).toBe(20);
  });

  it('should show an error with a retry button when loading fails', async () => {
    const harness = await render('/problems', { fail: true });

    const alert = root(harness).querySelector('[role="alert"]');
    expect(alert?.textContent).toContain('Couldn’t load the problems.');
    expect(buttonNamed(harness, 'Retry')).toBeTruthy();
  });

  it('should link each title to its workspace', async () => {
    const harness = await render();

    const link = rows(harness)[0].querySelector('a');
    expect(link?.getAttribute('href')).toBe('/challenge-workspace?problem=two-sum');
  });
});
