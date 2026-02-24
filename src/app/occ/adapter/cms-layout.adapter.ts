import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { AppConfigService } from "../../core/config/app-config.service";
import { CmsPageLayout } from "../../shared/models/cms-layout.model";
import { Observable } from "rxjs";


@Injectable({  providedIn: "root" })
export class CmsLayoutAdapter{
    private readonly http = inject(HttpClient);
    private readonly config = inject(AppConfigService);
    private readonly homeLayoutPath= 'home-layout.json';
    

    getHomePageLayout(): Observable<CmsPageLayout>{
        return this.http.get<CmsPageLayout>(this.buildLayoutUrl(this.homeLayoutPath));
    }

    private buildLayoutUrl(layoutPath: string): string {
        return `${this.config.apiBaseUrl}/${layoutPath}`;
    }
}