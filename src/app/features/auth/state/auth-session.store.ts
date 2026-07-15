import { computed, Injectable, signal } from '@angular/core';

import type { AuthStatus, AuthUser } from '../types/auth.types';

@Injectable({
  providedIn: 'root',
})
export class AuthSessionStore {
  private readonly statusState = signal<AuthStatus>('unknown');

  private readonly userState = signal<AuthUser | null>(null);

  readonly status = this.statusState.asReadonly();
  readonly user = this.userState.asReadonly();

  readonly isAuthenticated = computed(() => this.statusState() === 'authenticated');

  readonly isAnonymous = computed(() => this.statusState() === 'anonymous');

  setAuthenticated(user: AuthUser): void {
    this.userState.set(user);
    this.statusState.set('authenticated');
  }

  setAnonymous(): void {
    this.userState.set(null);
    this.statusState.set('anonymous');
  }

  reset(): void {
    this.userState.set(null);
    this.statusState.set('unknown');
  }
}
