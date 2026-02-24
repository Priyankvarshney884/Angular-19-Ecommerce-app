import { inject, Injectable } from "@angular/core";
import { ProductAdapter } from "../adapter/product.adapter";
import { Observable } from "rxjs";
import { Product } from "../../shared/models/product.model";

@Injectable({ providedIn: 'root' })
export class ProductConnector {
    // Facade for product data. Hides implementation details of data retrieval and mapping.
    private readonly adapter = inject(ProductAdapter);
    
    getProducts(): Observable<Product[]>
    {
        return this.adapter.getProducts();

    }

    getProductByCode(code:string): Observable<Product | undefined>
    {
        return this.adapter.getProductByCode(code);
    }
    
}