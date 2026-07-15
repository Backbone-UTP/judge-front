import { inject, Injectable } from '@angular/core';
import { finalize, map, Observable, of, shareReplay, tap } from 'rxjs';

import { AuthRepository } from '../data-access/auth.repository';
import type { AuthUser, LoginCredentials } from '../types/auth.types';
import { AuthSessionStore } from './auth-session.store';

@Injectable({
  providedIn: 'root',
})
export class AuthFacade {
  private readonly repository = inject(AuthRepository);

  private readonly session = inject(AuthSessionStore);

  private restoreRequest: Observable<boolean> | null = null;

  readonly status = this.session.status;
  readonly user = this.session.user;

  readonly isAuthenticated = this.session.isAuthenticated;

  ensureSession(): Observable<boolean> {
    const status = this.session.status();

    if (status !== 'unknown') {
      return of(status === 'authenticated');
    }

    if (this.restoreRequest) {
      return this.restoreRequest;
    }

    const request = this.repository.restoreSession().pipe(
      tap((user) => {
        if (user) {
          this.session.setAuthenticated(user);
          return;
        }

        this.session.setAnonymous();
      }),
      map((user) => user !== null),
      finalize(() => {
        this.restoreRequest = null;
      }),
      shareReplay({
        bufferSize: 1,
        refCount: false,
      }),
    );

    this.restoreRequest = request;

    return request;
  }

  login(credentials: LoginCredentials): Observable<AuthUser> {
    return this.repository
      .login(credentials)
      .pipe(tap((user) => this.session.setAuthenticated(user)));
  }

  logout(): Observable<void> {
    return this.repository.logout().pipe(finalize(() => this.session.setAnonymous()));
  }
}
