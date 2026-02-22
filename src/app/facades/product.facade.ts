import { computed,  inject, Injectable, signal } from "@angular/core";
import { ProductConnector } from "../occ/connector/product.connector";
import { Product } from "../shared/models/product.model";
import { firstValueFrom } from "rxjs";



interface ProductFilter {
    searchTerm:string;
    minPrice:number | null;
    maxPrice:number | null;
}

@Injectable({ providedIn: 'root' })
export class ProductFacade {
    // Facade for product data. Hides implementation details of data retrieval and mapping.}
    private readonly connector = inject(ProductConnector);
    readonly products = signal <Product[]>([]);
    readonly loading = signal(false);
    readonly error = signal<string | null>(null);
    readonly filters = signal<ProductFilter>({
        searchTerm: '',
        minPrice: null,
        maxPrice: null
     });
    

     readonly fileteredProducts = computed(()=>{
        const { searchTerm, minPrice, maxPrice } = this.filters();
        const normalizedTerm = searchTerm.toLowerCase();

        return this.products().filter((product)=>{
            const matchesTerm = !normalizedTerm || product.name.toLowerCase().includes(normalizedTerm) || product.description?.toLowerCase().includes(normalizedTerm);
            const matchesMinPrice = minPrice === null || (product.price !== undefined && product.price >= minPrice);
            const matchesMaxPrice = maxPrice === null || (product.price !== undefined && product.price <= maxPrice);

            return matchesTerm && matchesMinPrice && matchesMaxPrice;
        })
     })

     async loadProducts():Promise<void>{
        this.loading.set(true);
        this.error.set(null);

        try{
            const products = await firstValueFrom(this.connector.getProducts());
            this.products.set(products);
             
        }
        catch(error){
            this.error.set('Failed to load products. Please try again later.');
        }
        finally{
            this.loading.set(false);
        }
     }

     async getProductByCode(code:string): Promise<Product | undefined>{
        if(!this.products().length){
            await this.loadProducts();
        }
        return this.products().find(p => p.code === code);  
     }

     setSearchTerm(searchTerm:string): void{
        this.filters.update((current)=>({...current, searchTerm}))
     }

     setMinPrice(minPrice:number | null): void{
        this.filters.update((current)=>({...current, minPrice}))
     }

     setMaxPrice(maxPrice:number | null): void{
        this.filters.update((current)=>({...current, maxPrice}))
     }

     clearFilters(): void{
        this.filters.set({
            searchTerm: '',
            minPrice: null,
            maxPrice: null
        })
     }
}