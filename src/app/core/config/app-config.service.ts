import { inject, Injectable } from "@angular/core";
import { APP_CONFIG } from "./app-config.token";

@Injectable({ providedIn: 'root' })
export class AppConfigService {
    // Single source of truth for runtime app settings.

    private readonly config = inject(APP_CONFIG);

    readonly production = this.config.production;
    readonly apiBaseUrl = this.config.apiBaseUrl
    readonly features = this.config.features;

}
