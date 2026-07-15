import { Injectable } from '@angular/core';
import { defer, delay, Observable, of, switchMap, throwError, timer } from 'rxjs';

import type { AuthUser, LoginCredentials } from '../types/auth.types';
import { AuthRepository } from './auth.repository';

const DEMO_SESSION_KEY = 'backbone-demo-session';

const DEMO_USER: AuthUser = {
  id: 'student-001',
  email: 'student@backboneutp.com',
  displayName: 'Backbone Student',
  roles: ['student'],
};

@Injectable()
export class FakeAuthRepository extends AuthRepository {
  login(credentials: LoginCredentials): Observable<AuthUser> {
    return timer(400).pipe(
      switchMap(() => {
        const hasValidCredentials =
          credentials.email === DEMO_USER.email && credentials.password === 'backbone';

        if (!hasValidCredentials) {
          return throwError(() => new Error('INVALID_CREDENTIALS'));
        }

        sessionStorage.setItem(DEMO_SESSION_KEY, 'active');

        return of(DEMO_USER);
      }),
    );
  }

  restoreSession(): Observable<AuthUser | null> {
    return defer(() => {
      const hasSession = sessionStorage.getItem(DEMO_SESSION_KEY) === 'active';

      return of(hasSession ? DEMO_USER : null);
    }).pipe(delay(200));
  }

  logout(): Observable<void> {
    return defer(() => {
      sessionStorage.removeItem(DEMO_SESSION_KEY);
      return of(undefined);
    }).pipe(delay(200));
  }
}
