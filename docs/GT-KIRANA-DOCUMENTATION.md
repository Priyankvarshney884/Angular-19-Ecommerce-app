# GT Kirana - Complete Grocery Store Documentation

> **A Modern Angular 19 Composable Storefront for Grocery E-Commerce**

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Architecture](#architecture)
3. [Features](#features)
4. [Technology Stack](#technology-stack)
5. [Getting Started](#getting-started)
6. [Project Structure](#project-structure)
7. [Data Models](#data-models)
8. [Composable Store Pattern](#composable-store-pattern)
9. [Components Guide](#components-guide)
10. [API Integration](#api-integration)
11. [State Management](#state-management)
12. [Deployment](#deployment)
13. [Future Enhancements](#future-enhancements)

---

## 🎯 Project Overview

**GT Kirana** is a full-featured grocery e-commerce platform built with Angular 19, implementing SAP Composable Storefront architecture patterns. It demonstrates modern frontend development practices with signal-based state management, lazy loading, and a clean separation of concerns.

### Key Highlights

- ✅ **500+ Products** across 8 major categories
- ✅ **Signal-Based State** using Angular 19's reactive primitives
- ✅ **Composable Architecture** with Facade → Connector → Adapter pattern
- ✅ **Full E-Commerce Features** including cart, wishlist, checkout, and orders
- ✅ **Responsive Design** optimized for mobile and desktop
- ✅ **Mock API** with realistic grocery data
- ✅ **LocalStorage Persistence** for cart and wishlist

---

## 🏗️ Architecture

### Composable Storefront Pattern

```
┌─────────────────────────────────────────────────────────────┐
│  UI Components (Features)                                    │
│  ↓ Inject facades only, no direct HTTP                      │
├─────────────────────────────────────────────────────────────┤
│  Facades (Business Logic & State Management)                │
│  ↓ Manages signals, computed values, side effects           │
├─────────────────────────────────────────────────────────────┤
│  Connectors (Domain Gateway)                                │
│  ↓ Business-friendly API contracts                          │
├─────────────────────────────────────────────────────────────┤
│  Adapters (HTTP & Data Transformation)                      │
│  ↓ Endpoint construction, response mapping                  │
├─────────────────────────────────────────────────────────────┤
│  HttpClient / Mock API                                      │
└─────────────────────────────────────────────────────────────┘
```

### Why This Architecture?

1. **Separation of Concerns**: UI components don't know about HTTP details
2. **Testability**: Each layer can be tested independently
3. **Flexibility**: Easy to swap backend implementations
4. **Maintainability**: Changes in one layer don't affect others
5. **Scalability**: New features follow established patterns

---

## ✨ Features

### Core Shopping Features

#### 🏠 Home Page
- Hero banner with promotional content
- Category navigation grid
- Featured products showcase
- Special deals section
- Quick add to cart/wishlist

#### 🛍️ Product Catalog
- 500+ grocery products
- 8 major categories:
  - Fruits & Vegetables
  - Dairy & Eggs
  - Staples (Rice, Flour, Pulses)
  - Snacks & Beverages
  - Personal Care
  - Household Items
  - Bakery & Bread
  - Frozen Foods

#### 🔍 Advanced Filtering
- Search by name/description/brand
- Filter by category and subcategory
- Price range filtering
- Brand filtering
- Tag-based filtering (bestseller, organic, etc.)
- Rating filter
- In-stock only option
- Multiple sort options (price, rating, popularity, name)

#### 🛒 Shopping Cart
- Add/remove/update quantities
- Real-time total calculation
- Savings display
- LocalStorage persistence
- Empty cart state

#### ❤️ Wishlist
- Save favorite products
- Move to cart functionality
- Persistent storage
- Quick remove option

#### 📦 Orders
- Order history
- Order tracking
- Reorder functionality
- Order status updates

#### 👤 User Account
- Profile management
- Saved addresses
- Loyalty points
- Order history
- Settings

#### 💳 Checkout Flow
- Address selection/addition
- Delivery slot selection
- Payment method selection
- Order summary
- Order confirmation

### Advanced Features

#### 🎁 Deals & Promotions
- Percentage discounts
- BOGO offers
- Minimum order value deals
- Category-specific promotions

#### 🚚 Delivery Options
- Same-day delivery
- Next-day delivery
- Scheduled delivery slots
- Store pickup option

#### 💰 Pricing Features
- Original price display
- Discount calculation
- Savings highlight
- Dynamic pricing

---

## 🛠️ Technology Stack

| Category | Technology | Version |
|----------|-----------|---------|
| **Framework** | Angular | 19.2.0 |
| **Language** | TypeScript | 5.7.2 |
| **State Management** | Signals + NgRx | 19.2.1 |
| **Styling** | SCSS | - |
| **HTTP Client** | Angular HttpClient | 19.2.0 |
| **Routing** | Angular Router | 19.2.0 |
| **Build Tool** | Angular CLI | 19.2.20 |

### Angular 19 Features Used

- ✅ Standalone Components
- ✅ Signal-based State Management
- ✅ New Control Flow (`@if`, `@for`, `@defer`)
- ✅ Function-based `input()` and `output()`
- ✅ `effect()` for side effects
- ✅ `computed()` for derived state
- ✅ Route-level lazy loading

---

## 🚀 Getting Started

### Prerequisites

```bash
Node.js >= 20.x
npm >= 10.x
```

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd angular-self-code

# Install dependencies
npm install

# Start development server
npm start

# Navigate to
http://localhost:4200
```

### Build for Production

```bash
# Create optimized build
npm run build

# Output directory
dist/angular-self-code/browser/
```

### Run Tests

```bash
npm test
```

---

## 📁 Project Structure

```
src/app/
├── features/                    # Feature modules
│   ├── grocery-home/           # Main home page
│   ├── product-list/           # Product catalog
│   ├── product-details/        # Product detail page
│   ├── cart/                   # Shopping cart
│   ├── checkout/               # Checkout flow
│   ├── wishlist/               # Wishlist management
│   ├── orders/                 # Order history
│   └── account/                # User account
│
├── facades/                     # Business logic layer
│   └── grocery.facade.ts       # Main grocery facade
│
├── occ/                        # Data layer
│   ├── connector/              # Domain gateways
│   │   └── grocery.connector.ts
│   └── adapter/                # HTTP & data mapping
│       └── grocery.adapter.ts
│
├── shared/                     # Shared utilities
│   └── models/                 # TypeScript interfaces
│       └── grocery.model.ts    # Grocery data models
│
├── core/                       # Core services
│   ├── config/                 # App configuration
│   └── http/                   # HTTP interceptors
│
└── store/                      # NgRx store (minimal)
    ├── actions/
    ├── reducers/
    ├── effects/
    └── selectors/

public/mock-api/                # Mock data
├── grocery-products.json       # Main product data
└── extended-products.json      # Additional products
```

---

## 📊 Data Models

### GroceryProduct

```typescript
interface GroceryProduct {
  code: string;                 // Unique product code
  name: string;                 // Product name
  description: string;          // Product description
  price: number;                // Current price
  originalPrice?: number;       // Original price (for discounts)
  discount?: number;            // Discount percentage
  category: string;             // Main category
  subCategory: string;          // Sub-category
  unit: string;                 // Unit (kg, piece, etc.)
  stock: number;                // Available stock
  images: string[];             // Product images
  rating: number;               // Average rating
  reviews: number;              // Number of reviews
  tags?: string[];              // Tags (bestseller, organic, etc.)
  brand?: string;               // Brand name
  nutritionInfo?: NutritionInfo;
}
```

### CartItem

```typescript
interface CartItem {
  product: GroceryProduct;
  quantity: number;
}
```

### Order

```typescript
interface Order {
  id: string;
  orderNumber: string;
  date: Date;
  status: 'pending' | 'confirmed' | 'packed' | 'shipped' | 'delivered' | 'cancelled';
  items: CartItem[];
  subtotal: number;
  deliveryCharge: number;
  discount: number;
  total: number;
  deliveryAddress: Address;
  deliverySlot: DeliverySlot;
  paymentMethod: string;
  estimatedDelivery: Date;
}
```

---

## 🎨 Composable Store Pattern

### GroceryFacade

The `GroceryFacade` is the central business logic layer that manages all grocery-related state and operations.

#### State Signals

```typescript
// Product State
readonly products = signal<GroceryProduct[]>([]);
readonly selectedProduct = signal<GroceryProduct | null>(null);
readonly loading = signal(false);
readonly error = signal<string | null>(null);

// Cart State
readonly cart = signal<CartItem[]>([]);

// Wishlist State
readonly wishlist = signal<WishlistItem[]>([]);

// Filter State
readonly filters = signal<GroceryFilter>({...});
```

#### Computed Values

```typescript
// Filtered products based on current filters
readonly filteredProducts = computed(() => {
  // Complex filtering logic
});

// Cart calculations
readonly cartTotal = computed(() => {...});
readonly cartItemCount = computed(() => {...});
readonly cartSavings = computed(() => {...});
```

#### Methods

```typescript
// Product operations
async loadProducts(): Promise<void>
async loadProductByCode(code: string): Promise<void>

// Cart operations
addToCart(product: GroceryProduct, quantity: number): void
removeFromCart(productCode: string): void
updateCartItemQuantity(productCode: string, quantity: number): void

// Wishlist operations
addToWishlist(product: GroceryProduct): void
removeFromWishlist(productCode: string): void

// Filter operations
setSearchTerm(searchTerm: string): void
setCategories(categories: string[]): void
setPriceRange(min: number | null, max: number | null): void
```

### Usage in Components

```typescript
@Component({...})
export class GroceryHomeComponent {
  private readonly groceryFacade = inject(GroceryFacade);
  
  // Expose signals to template
  readonly products = this.groceryFacade.products;
  readonly loading = this.groceryFacade.loading;
  readonly cartItemCount = this.groceryFacade.cartItemCount;
  
  ngOnInit(): void {
    this.groceryFacade.loadProducts();
  }
  
  addToCart(product: GroceryProduct): void {
    this.groceryFacade.addToCart(product);
  }
}
```

---

## 🧩 Components Guide

### GroceryHomeComponent

**Purpose**: Main landing page showcasing categories, deals, and featured products

**Features**:
- Hero banner carousel
- Category grid navigation
- Featured products section
- Special deals showcase
- Quick add to cart/wishlist

**Route**: `/`

### ProductListComponent

**Purpose**: Display filtered and sorted product catalog

**Features**:
- Advanced filtering sidebar
- Sort options
- Grid/list view toggle
- Pagination
- Quick view

**Route**: `/products`, `/category/:id`

### ProductDetailsComponent

**Purpose**: Detailed product information and purchase options

**Features**:
- Product image gallery
- Detailed description
- Nutrition information
- Add to cart with quantity
- Related products
- Reviews and ratings

**Route**: `/product/:code`

### CartComponent

**Purpose**: Shopping cart management

**Features**:
- Item list with quantities
- Update/remove items
- Price breakdown
- Savings display
- Proceed to checkout

**Route**: `/cart`

### CheckoutComponent

**Purpose**: Complete purchase flow

**Features**:
- Address selection/addition
- Delivery slot selection
- Payment method selection
- Order summary
- Place order

**Route**: `/checkout`

### WishlistComponent

**Purpose**: Manage saved products

**Features**:
- Wishlist grid
- Move to cart
- Remove items
- Product quick view

**Route**: `/wishlist`

### OrdersComponent

**Purpose**: View order history and track orders

**Features**:
- Order list
- Order details
- Status tracking
- Reorder functionality

**Route**: `/orders`

### AccountComponent

**Purpose**: User profile and settings

**Features**:
- Profile information
- Saved addresses
- Loyalty points
- Settings

**Route**: `/account`

---

## 🔌 API Integration

### Current Implementation: Mock API

The application currently uses JSON files served from the `public/mock-api/` directory.

#### Endpoints

```typescript
GET /mock-api/grocery-products.json
// Returns: { products, categories, deals, banners }

GET /mock-api/extended-products.json
// Returns: { additionalProducts }
```

### Switching to Real API

To integrate with a real backend:

1. **Update GroceryAdapter**:

```typescript
@Injectable({ providedIn: 'root' })
export class GroceryAdapter {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl; // Use environment config
  
  loadProducts(): Observable<GroceryProduct[]> {
    return this.http.get<GroceryProduct[]>(`${this.baseUrl}/products`);
  }
  
  loadProductByCode(code: string): Observable<GroceryProduct | null> {
    return this.http.get<GroceryProduct>(`${this.baseUrl}/products/${code}`);
  }
  
  // Add authentication, error handling, etc.
}
```

2. **Update Environment Config**:

```typescript
// src/environments/environment.ts
export const environment = {
  production: false,
  apiUrl: 'https://api.gtkirana.com/v1'
};
```

3. **No changes needed** in Facade or Components!

---

## 💾 State Management

### Signal-Based State

GT Kirana uses Angular 19's signal-based state management for reactive, efficient updates.

#### Benefits

- ✅ **Fine-grained reactivity**: Only affected components re-render
- ✅ **Type-safe**: Full TypeScript support
- ✅ **Simple API**: Easy to understand and use
- ✅ **Performance**: Optimized change detection
- ✅ **Computed values**: Automatic dependency tracking

#### LocalStorage Persistence

Cart and wishlist are automatically persisted using `effect()`:

```typescript
constructor() {
  // Auto-save cart to localStorage
  effect(() => {
    const cartData = this.cart();
    localStorage.setItem('gt-kirana-cart', JSON.stringify(cartData));
  });
  
  // Auto-save wishlist to localStorage
  effect(() => {
    const wishlistData = this.wishlist();
    localStorage.setItem('gt-kirana-wishlist', JSON.stringify(wishlistData));
  });
}
```

---

## 🚀 Deployment

### Vercel Deployment (Recommended)

1. **Install Vercel CLI**:
```bash
npm i -g vercel
```

2. **Deploy**:
```bash
vercel
```

3. **Production Deploy**:
```bash
vercel --prod
```

### Configuration

The `vercel.json` file is already configured:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist/angular-self-code/browser",
  "framework": "angular"
}
```

### Other Platforms

- **Netlify**: Use `dist/angular-self-code/browser` as publish directory
- **Firebase Hosting**: Configure `firebase.json` with same output directory
- **AWS S3 + CloudFront**: Upload build output to S3 bucket

---

## 🔮 Future Enhancements

### Phase 1: Enhanced Features
- [ ] Server-Side Rendering (SSR)
- [ ] Progressive Web App (PWA)
- [ ] Advanced search with autocomplete
- [ ] Product recommendations
- [ ] User reviews and ratings
- [ ] Social sharing

### Phase 2: Business Features
- [ ] Subscription boxes
- [ ] Loyalty program
- [ ] Referral system
- [ ] Gift cards
- [ ] Bulk ordering
- [ ] Corporate accounts

### Phase 3: Technical Improvements
- [ ] Real-time inventory updates
- [ ] WebSocket for order tracking
- [ ] Advanced analytics
- [ ] A/B testing framework
- [ ] Performance monitoring
- [ ] Error tracking (Sentry)

### Phase 4: Integration
- [ ] Payment gateway integration
- [ ] SMS notifications
- [ ] Email marketing
- [ ] CRM integration
- [ ] Inventory management system
- [ ] Delivery partner APIs

---

## 📝 Development Guidelines

### Code Style

- Use TypeScript strict mode
- Follow Angular style guide
- Use meaningful variable names
- Add JSDoc comments for public APIs
- Keep components focused and small

### Component Structure

```typescript
@Component({
  selector: 'app-feature',
  standalone: true,
  imports: [CommonModule, ...],
  templateUrl: './feature.component.html',
  styleUrl: './feature.component.scss'
})
export class FeatureComponent {
  // 1. Injected dependencies
  private readonly facade = inject(SomeFacade);
  
  // 2. Input/Output signals
  readonly input = input<string>();
  readonly output = output<string>();
  
  // 3. Local state signals
  readonly localState = signal<any>(null);
  
  // 4. Computed values
  readonly computed = computed(() => {...});
  
  // 5. Lifecycle hooks
  ngOnInit(): void {}
  
  // 6. Public methods
  public method(): void {}
  
  // 7. Private methods
  private helper(): void {}
}
```

### Testing Strategy

1. **Unit Tests**: Test facades and services
2. **Component Tests**: Test component logic
3. **Integration Tests**: Test feature flows
4. **E2E Tests**: Test critical user journeys

---

## 🤝 Contributing

### Getting Started

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Write/update tests
5. Submit a pull request

### Commit Convention

```
feat: Add new feature
fix: Fix bug
docs: Update documentation
style: Format code
refactor: Refactor code
test: Add tests
chore: Update dependencies
```

---

## 📞 Support

For questions or issues:

- 📧 Email: support@gtkirana.com
- 📱 Phone: +91 98765 43210
- 🌐 Website: https://gtkirana.com

---

## 📄 License

This project is licensed under the MIT License.

---

## 🙏 Acknowledgments

- **SAP Spartacus**: Architecture inspiration
- **Angular Team**: Amazing framework
- **Community**: Tutorials and best practices

---

**Built with ❤️ using Angular 19**

*Last Updated: April 2026*