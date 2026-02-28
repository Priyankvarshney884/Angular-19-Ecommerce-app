import { computed, effect, inject, Injectable, PLATFORM_ID, signal } from "@angular/core";
import { Cart, CartItem } from "../shared/models/cart.model";
import { Product } from "../shared/models/product.model";
import { isPlatformBrowser } from "@angular/common";


@Injectable({ providedIn: 'root' })

export class CartFacade {

    private readonly platformId = inject(PLATFORM_ID);
    private readonly cartStoragekey = 'storefront-cart-item';

    readonly items = signal<CartItem[]>([]);

    readonly totalItems = computed(() => this.items().reduce((total, item) => total + item.quantity, 0));
     readonly subtotal = computed(() =>
    this.items().reduce((total, item) => total + item.product.price * item.quantity, 0)
  );
    constructor() {
        if (isPlatformBrowser(this.platformId)) {
            const storedItems = this.readPersistedItems();
            if (storedItems) {
                this.items.set(storedItems);
            }
        }

        effect(() => {
            if (!isPlatformBrowser(this.platformId)) {
                return;
            }
            localStorage.setItem(this.cartStoragekey, JSON.stringify(this.items()));
        })
    }

    addToCart(product: Product): void {
        this.items.update(currentItems => {
            const existingItem = currentItems.find(item => item.product.code === product.code);
            if (!existingItem) {
                return [...currentItems, { product, quantity: 1 }];
            }
            return currentItems.map(item => {
                if (item.product.code === product.code) {
                    return { ...item, quantity: item.quantity + 1 };
                }
                return item;
            });
        });



    }

    updateQuantity(productCode: string, quantity: number): void {
        if (quantity <= 0) {
            this.removeItem(productCode);
            return;
        }
        this.items.update((current) =>
            current.map((item) => (item.product.code === productCode ? { ...item, quantity } : item))
        );
    }
    removeItem(productCode: string): void {
            this.items.update((current) => current.filter((item) => item.product.code !== productCode));
        }

    clearCart(): void {
            this.items.set([]);
        }


    private readPersistedItems(): CartItem[] | null {
        const rawItems = localStorage.getItem(this.cartStoragekey);
        if (!rawItems) {
            return null;
        }
        try {
            const parsedItems = JSON.parse(rawItems);
            return Array.isArray(parsedItems) ? (parsedItems as CartItem[]) : null;

        } catch (error) {
            console.error('Error parsing persisted cart items:', error);
            return null;
        }
    }
}