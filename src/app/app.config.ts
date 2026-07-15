import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
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
  ],
};
