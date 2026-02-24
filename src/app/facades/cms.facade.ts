import { inject, Injectable, signal } from "@angular/core";
import { CmsPageLayout } from "../shared/models/cms-layout.model";
import { CmsLayoutConnector } from "../occ/connector/cms-layout.connector";
import { firstValueFrom } from "rxjs";


@Injectable({ providedIn: "root" })

export class CmsFacade {
    private readonly connector = inject(CmsLayoutConnector);

    readonly homeLayout = signal<CmsPageLayout | null>(null);
    readonly loading = signal(false);
    readonly error = signal<string | null>(null);

    async loadHomeLayout() {
        this.loading.set(true);
        this.error.set(null);

        try {
            const layout = await firstValueFrom(this.connector.getHomePageLayout());
            this.homeLayout.set(layout);
        }
        catch (error) {
            this.error.set("Failed to load home page layout");
        } finally {
            this.loading.set(false);
        }
    }
}