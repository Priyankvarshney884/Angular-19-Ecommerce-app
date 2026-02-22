import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { AppConfigService } from "../../core/config/app-config.service";
import { map, Observable } from "rxjs";
import { Product } from "../../shared/models/product.model";



@Injectable({ providedIn: 'root' })
export class ProductAdapter {
    private readonly http = inject(HttpClient);
    private readonly config = inject(AppConfigService);

    getProducts(): Observable<Product[]>
    {
        return this.http.get<Product[]>(`${this.config.apiBaseUrl}/product.json`);
    }

    getProduct(code:string): Observable<Product | undefined>
    {
        return this.getProducts().pipe(map((products)=> products.find(p => p.code === code)));   
    }

    
}
