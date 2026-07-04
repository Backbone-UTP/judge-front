import { inject } from '@angular/core';
import { CanMatchFn, Router, UrlSegment } from '@angular/router';
import { map } from 'rxjs';

import { AuthFacade } from '../state/auth-facade';

function buildReturnUrl(segments: UrlSegment[]): string {
  const path = segments.map((segment) => segment.path).join('/');

  return path ? `/${path}` : '/';
}

export const authenticatedGuard: CanMatchFn = (_route, segments) => {
  const authFacade = inject(AuthFacade);
  const router = inject(Router);

  const returnUrl = buildReturnUrl(segments);

  return authFacade.ensureSession().pipe(
    map((isAuthenticated) => {
      if (isAuthenticated) {
        return true;
      }

      return router.createUrlTree(['/login'], {
        queryParams: {
          returnUrl,
        },
      });
    }),
  );
};
