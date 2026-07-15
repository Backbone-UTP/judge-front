import type { Observable } from 'rxjs';

import type { AuthUser, LoginCredentials } from '../types/auth.types';

export abstract class AuthRepository {
  abstract login(credentials: LoginCredentials): Observable<AuthUser>;

  abstract restoreSession(): Observable<AuthUser | null>;

  abstract logout(): Observable<void>;
}
