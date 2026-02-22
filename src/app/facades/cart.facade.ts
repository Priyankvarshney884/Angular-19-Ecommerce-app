import { computed, Injectable, signal } from "@angular/core";
import { CartItem } from "../shared/models/cart.model";
import { Product } from "../shared/models/product.model";


@Injectable({ providedIn: 'root' })

export class CartFacade {
    readonly items = signal<CartItem[]>([]);

    readonly totalItems = computed(() => this.items().reduce((total, item) => total + item.quantity, 0));
    readonly subtotal = computed(() => this.items().reduce((total, item) => total + (item.product.price || 0) * item.quantity, 0));

    addToCart(Product: Product): void {
        this.items.update((current) => {
            const existingItem = current.find((item) => item.product.code === Product.code);
            if (!existingItem) {
                return [...current, { product: Product, quantity: 1 }];
            }
            return current.map(item => item.product.code === Product.code ? { ...item, quantity: item.quantity + 1 } : item);
        })
    }

    updateQuantity(productCode: string, quantity: number): void {
        if (quantity <= 0) {
            this.removeItem(productCode);
            return;
        }
        this.items.update((current) => current.map(item => item.product.code === productCode ? { ...item, quantity } : item));
    }

    removeItem(productCode: string): void {
        this.items.update((current) => current.filter(item => item.product.code !== productCode));
    }

    clearCart(): void {
        this.items.set([]);
    }
}