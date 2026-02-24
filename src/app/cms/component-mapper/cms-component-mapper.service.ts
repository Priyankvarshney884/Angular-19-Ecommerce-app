import { Injectable, Type } from "@angular/core";
import { FeatureTileComponent } from "../components/feature-tile/feature-tile.component";
import { HeroBannerComponent } from "../components/hero-banner/hero-banner.component";
import { PromoStripComponent } from "../components/promo-strip/promo-strip.component";


@Injectable({  providedIn: "root" })
export class CmsComponentMapperService {
    private readonly componentMap: Record<string, Type<unknown>> = {
        HeroBannerComponent,
        PromoStripComponent,
        FeatureTileComponent,
    };

    getComponent(type: string): Type<unknown> | null {
        return this.componentMap[type] ?? null;
    }   
}