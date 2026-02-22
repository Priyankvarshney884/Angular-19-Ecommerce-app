import { Inject, InjectionToken } from "@angular/core";
import { environment } from "../../../enviornments/environment";
import { AppConfig } from "./app-config.model";

// Injection token exposes environment config in a typed, testable way.

export const APP_CONFIG = new InjectionToken<AppConfig>('APP_CONFIG', {
  providedIn: 'root',
  // Value is replaced by Angular CLI fileReplacements in development builds.
  factory: () => environment
});
