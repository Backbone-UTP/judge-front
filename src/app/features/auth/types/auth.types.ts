export type AuthStatus = 'unknown' | 'authenticated' | 'anonymous';

export type UserRole = 'student' | 'reviewer' | 'admin';

export interface AuthUser {
  id: string;
  email: string;
  displayName: string;
  roles: readonly UserRole[];
}

export interface LoginCredentials {
  email: string;
  password: string;
}
