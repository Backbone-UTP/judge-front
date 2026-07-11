import { Routes } from '@angular/router';

import { anonymousOnlyGuard } from './features/auth/guard/anonymous-only.guard';

import { authenticatedGuard } from './features/auth/guard/authenticated.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'challenge-workspace',
    pathMatch: 'full',
  },
  {
    path: 'login',
    canMatch: [anonymousOnlyGuard],
    loadComponent: () =>
      import('./features/auth/pages/login/login').then((module) => module.LoginPage),
  },
  {
    path: 'challenge-workspace',
    canMatch: [authenticatedGuard],
    loadChildren: () =>
      import('./features/challenge-workspace/challenge-workspace').then(
        (module) => module.challengeWorkspaceRoutes,
      ),
  },
  {
    path: '**',
    redirectTo: 'challenge-workspace',
  },
];
