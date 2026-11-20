import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {
  FakeCatalogRepository,
  FakeLeaderboardRepository,
  FakeProblemsRepository,
  FakeProfileRepository,
} from './core/progress/data-access/fake-progress.repositories';
import {
  CatalogRepository,
  LeaderboardRepository,
  ProblemsRepository,
  ProfileRepository,
} from './core/progress/data-access/progress.repositories';
import { FakeAuthRepository } from './features/auth/data-access/fake-auth.repository';
import { AuthRepository } from './features/auth/data-access/auth.repository';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    {
      provide: AuthRepository,
      useClass: FakeAuthRepository,
    },
    // Fake progress data until the API exists (US-23 to US-25 swap these for HTTP repositories).
    // To build error states, provide FAKE_PROGRESS_OPTIONS with `fail: true`.
    { provide: ProblemsRepository, useClass: FakeProblemsRepository },
    { provide: LeaderboardRepository, useClass: FakeLeaderboardRepository },
    { provide: CatalogRepository, useClass: FakeCatalogRepository },
    { provide: ProfileRepository, useClass: FakeProfileRepository },
  ],
};
