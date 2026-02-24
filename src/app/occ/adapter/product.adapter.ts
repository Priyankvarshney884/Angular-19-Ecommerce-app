import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { AppConfigService } from "../../core/config/app-config.service";
import { map, Observable } from "rxjs";
import { Product } from "../../shared/models/product.model";


interface ProductDto{
    code: string;
    name: string;
    description: string;
    price: number;
   currencyIso?: string;
   imageUrl?: string;

}
@Injectable({ providedIn: 'root' })
export class ProductAdapter {
    private readonly http = inject(HttpClient);
    private readonly config = inject(AppConfigService);
    private readonly productPath = 'product.json'
    getProducts(): Observable<Product[]>
    {
        const endpoint = this.buildEndpoint(this.productPath);
        return this.http.get<ProductDto[]>(endpoint).pipe(
        map((products) => products.map((product) => this.toProduct(product)))
        );
    }

    getProductByCode(code:string): Observable<Product | undefined>
    {
        return this.getProducts().pipe(map((products)=> products.find(p => p.code === code)));   
    }

    private buildEndpoint(path: string): string {
        const normalizedBaseUrl = this.config.apiBaseUrl.replace(/\/+$/, '');
    const normalizedPath = path.replace(/^\/+/, '');
    return `${normalizedBaseUrl}/${normalizedPath}`;
    }

    private toProduct(product: ProductDto): Product {
    return {
      code: product.code,
      name: product.name,
      description: product.description,
      price: product.price,
      currencyIso: product.currencyIso,
      imageUrl: product.imageUrl
    };
  }
    
}
