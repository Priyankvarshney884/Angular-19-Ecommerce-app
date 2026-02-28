import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withPreloading } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { authTokenInterceptor } from './core/http/auth-token.interceptor';
import { apiErrorInterceptor } from './core/http/api-error.interceptor';
import { SelectivePreloadingStrategy } from './core/routing/selective-preloading.strategy';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes, withPreloading(SelectivePreloadingStrategy)),
    provideHttpClient(withFetch(), withInterceptors([authTokenInterceptor, apiErrorInterceptor])), provideClientHydration(withEventReplay())
  ]
};
