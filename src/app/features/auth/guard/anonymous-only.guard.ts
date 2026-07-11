import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { map } from 'rxjs';

import { AuthFacade } from '../state/auth-facade';

export const anonymousOnlyGuard: CanMatchFn = () => {
  const authFacade = inject(AuthFacade);
  const router = inject(Router);

  return authFacade
    .ensureSession()
    .pipe(
      map((isAuthenticated) => (isAuthenticated ? router.parseUrl('/challenge-workspace') : true)),
    );
};
