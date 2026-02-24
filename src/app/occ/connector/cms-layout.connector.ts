import { inject, Injectable } from "@angular/core";
import { CmsLayoutAdapter } from "../adapter/cms-layout.adapter";


@Injectable({ providedIn: "root" })
export class CmsLayoutConnector {
    constructor() { }

    private readonly adapter = inject(CmsLayoutAdapter);

    getHomePageLayout() {
        return this.adapter.getHomePageLayout();
    }
}
