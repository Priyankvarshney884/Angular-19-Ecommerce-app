# GT Kirana - Complete Grocery Store Documentation

## 📋 Table of Contents
1. [Project Overview](#project-overview)
2. [Architecture](#architecture)
3. [Features](#features)
4. [Installation & Setup](#installation--setup)
5. [Project Structure](#project-structure)
6. [Components Guide](#components-guide)
7. [State Management](#state-management)
8. [API Integration](#api-integration)
9. [Styling Guide](#styling-guide)
10. [Development Workflow](#development-workflow)
11. [Testing](#testing)
12. [Deployment](#deployment)
13. [Future Enhancements](#future-enhancements)

---

## 🎯 Project Overview

**GT Kirana** is a modern, full-featured grocery e-commerce platform built with Angular 19 and SAP Composable Storefront architecture. It provides a complete online shopping experience for grocery items with features like product browsing, cart management, wishlist, user authentication, and order tracking.

### Key Highlights
- **Framework**: Angular 19.2.0 with standalone components
- **Architecture**: SAP Composable Storefront pattern (Facade → Connector → Adapter)
- **State Management**: Signal-based reactive state (Angular 19 signals)
- **Styling**: SCSS with mobile-first responsive design
- **Data**: Mock API with 100+ grocery products across 8 categories
- **Features**: Complete e-commerce functionality with cart, wishlist, checkout, orders

### Technology Stack
```json
{
  "frontend": "Angular 19.2.0",
  "language": "TypeScript 5.7.2",
  "stateManagement": "Angular Signals + NgRx 19.2.1",
  "styling": "SCSS",
  "routing": "Angular Router",
  "http": "HttpClient with Interceptors",
  "build": "Angular CLI with esbuild"
}
```

---

## 🏗️ Architecture

### SAP Composable Storefront Pattern

GT Kirana follows the SAP Composable Storefront architecture with three main layers:

```
┌─────────────────────────────────────────────────────────┐
│                    PRESENTATION LAYER                    │
│  (Components, Pages, UI Elements)                        │
│  - HomeComponent, ProductListComponent, CartComponent    │
│  - Product cards, Headers, Footers                       │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│                     FACADE LAYER                         │
│  (Business Logic, State Management)                      │
│  - GroceryFacade: Main business logic with signals       │
│  - CartFacade, ProductFacade, CmsFacade                  │
│  - Signal-based reactive state                           │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│                    CONNECTOR LAYER                       │
│  (Domain Gateway, Business Rules)                        │
│  - GroceryConnector: Domain-specific logic               │
│  - ProductConnector, CmsConnector                        │
│  - Data validation and transformation                    │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│                     ADAPTER LAYER                        │
│  (HTTP Communication, External APIs)                     │
│  - GroceryAdapter: HTTP requests and responses           │
│  - ProductAdapter, CmsAdapter                            │
│  - API endpoint management                               │
└─────────────────────────────────────────────────────────┘
```

### Signal-Based State Management

GT Kirana uses Angular 19's signal-based reactive state management:

```typescript
// Example from GroceryFacade
export class GroceryFacade {
  // Writable signals for state
  private productsSignal = signal<Product[]>([]);
  private cartSignal = signal<CartItem[]>([]);
  
  // Computed signals for derived state
  readonly products = this.productsSignal.asReadonly();
  readonly cartTotal = computed(() => 
    this.cartSignal().reduce((sum, item) => sum + item.total, 0)
  );
  
  // Effects for side effects
  constructor() {
    effect(() => {
      localStorage.setItem('cart', JSON.stringify(this.cartSignal()));
    });
  }
}
```

**Benefits:**
- ✅ Fine-grained reactivity
- ✅ Automatic dependency tracking
- ✅ Better performance (no zone.js overhead)
- ✅ Type-safe state updates
- ✅ Simpler than RxJS for state management

---

## ✨ Features

### 1. Home Page
- **Custom Header**: GT Kirana branding with logo, search bar, cart, and user actions
- **Promotional Carousel**: Auto-rotating slides showcasing discounts and sales
- **Product Sections**: Featured products, bestsellers, and category-specific items
- **Category Cards**: Quick access to Pharmacy, Pet Care, and Baby Care
- **Hero Banner**: Eye-catching banner with product showcase grid
- **Delivery Badge**: Free delivery information

### 2. Product Catalog
- **8 Categories**: Fruits & Vegetables, Dairy, Bakery, Snacks, Beverages, Staples, Personal Care, Household
- **100+ Products**: Comprehensive product database with realistic data
- **Product Details**: Name, price, discount, unit, rating, stock status
- **Search**: Real-time product search across all categories
- **Filters**: Category, price range, rating, availability
- **Sorting**: Price (low to high, high to low), name, rating, newest

### 3. Shopping Cart
- **Add to Cart**: Quick add from product cards
- **Quantity Management**: Increase/decrease item quantities
- **Remove Items**: Delete items from cart
- **Cart Summary**: Subtotal, tax, delivery charges, total
- **Persistent Cart**: LocalStorage persistence across sessions
- **Empty Cart State**: Friendly message when cart is empty

### 4. Wishlist
- **Save for Later**: Add products to wishlist
- **Move to Cart**: Quick move from wishlist to cart
- **Remove from Wishlist**: Delete items
- **Persistent Wishlist**: LocalStorage persistence

### 5. User Authentication
- **Login**: Email and password authentication
- **Register**: New user registration
- **Profile Management**: Update user details
- **Order History**: View past orders
- **Address Management**: Save multiple delivery addresses

### 6. Checkout Process
- **Delivery Address**: Select or add new address
- **Delivery Slot**: Choose preferred delivery time
- **Payment Options**: COD, Card, UPI, Wallet
- **Order Summary**: Review before placing order
- **Order Confirmation**: Success message with order ID

### 7. Order Management
- **Order Tracking**: Real-time order status
- **Order History**: List of all past orders
- **Order Details**: View items, prices, delivery info
- **Reorder**: Quick reorder from past orders
- **Cancel Order**: Cancel pending orders

### 8. Promotional Features
- **Deals & Offers**: Special discounts and promotions
- **Flash Sales**: Time-limited offers
- **Combo Offers**: Buy together and save
- **Coupon Codes**: Apply discount coupons
- **Loyalty Points**: Earn and redeem points

---

## 🚀 Installation & Setup

### Prerequisites
```bash
Node.js: v18.x or higher
npm: v9.x or higher
Angular CLI: v19.x
```

### Installation Steps

1. **Clone the Repository**
```bash
git clone <repository-url>
cd angular-self-code
```

2. **Install Dependencies**
```bash
npm install
```

3. **Start Development Server**
```bash
npm start
# or
ng serve
```

4. **Open in Browser**
```
http://localhost:4200
```

### Build for Production
```bash
npm run build
# or
ng build --configuration production
```

### Run Tests
```bash
npm test
# or
ng test
```

---

## 📁 Project Structure

```
angular-self-code/
├── src/
│   ├── app/
│   │   ├── cms/                          # CMS components
│   │   │   ├── components/               # CMS UI components
│   │   │   │   ├── hero-banner/
│   │   │   │   ├── feature-tile/
│   │   │   │   └── promo-strip/
│   │   │   ├── page-layout/              # CMS page layout
│   │   │   └── component-mapper/         # CMS component mapping
│   │   │
│   │   ├── core/                         # Core services
│   │   │   ├── auth/                     # Authentication
│   │   │   ├── config/                   # App configuration
│   │   │   ├── http/                     # HTTP interceptors
│   │   │   ├── i18n/                     # Internationalization
│   │   │   └── sitcontext/               # Site context
│   │   │
│   │   ├── facades/                      # Business logic layer
│   │   │   ├── grocery.facade.ts         # Main grocery facade
│   │   │   ├── cart.facade.ts            # Cart management
│   │   │   ├── product.facade.ts         # Product operations
│   │   │   └── cms.facade.ts             # CMS operations
│   │   │
│   │   ├── occ/                          # OCC layer (SAP pattern)
│   │   │   ├── adapter/                  # HTTP adapters
│   │   │   │   ├── grocery.adapter.ts
│   │   │   │   ├── product.adapter.ts
│   │   │   │   └── cms-layout.adapter.ts
│   │   │   └── connector/                # Domain connectors
│   │   │       ├── grocery.connector.ts
│   │   │       ├── product.connector.ts
│   │   │       └── cms-layout.connector.ts
│   │   │
│   │   ├── features/                     # Feature modules
│   │   │   ├── home/                     # Home page
│   │   │   ├── product-list/             # Product listing
│   │   │   ├── product-details/          # Product details
│   │   │   ├── cart/                     # Shopping cart
│   │   │   ├── checkout/                 # Checkout flow
│   │   │   └── auth/                     # Authentication
│   │   │
│   │   ├── shared/                       # Shared resources
│   │   │   ├── models/                   # TypeScript interfaces
│   │   │   │   ├── grocery.model.ts
│   │   │   │   ├── product.model.ts
│   │   │   │   ├── cart.model.ts
│   │   │   │   └── auth.model.ts
│   │   │   ├── directives/               # Custom directives
│   │   │   ├── pipes/                    # Custom pipes
│   │   │   └── ui/                       # Shared UI components
│   │   │
│   │   ├── store/                        # NgRx store (minimal)
│   │   │   ├── actions/
│   │   │   ├── reducers/
│   │   │   ├── effects/
│   │   │   └── selectors/
│   │   │
│   │   ├── ui/                           # Presentational components
│   │   │   ├── product-list-view/
│   │   │   └── product-details-view/
│   │   │
│   │   ├── app.component.ts              # Root component
│   │   ├── app.config.ts                 # App configuration
│   │   └── app.routes.ts                 # Route definitions
│   │
│   ├── enviornments/                     # Environment configs
│   │   ├── environment.ts
│   │   └── environment.development.ts
│   │
│   ├── index.html                        # HTML entry point
│   ├── main.ts                           # TypeScript entry point
│   └── styles.scss                       # Global styles
│
├── public/                               # Static assets
│   ├── mock-api/                         # Mock API data
│   │   ├── grocery-products.json         # 40 base products
│   │   ├── extended-products.json        # 60+ additional products
│   │   ├── home-layout.json              # CMS layout
│   │   └── product.json                  # Product data
│   └── favicon.ico
│
├── docs/                                 # Documentation
│   ├── GT-KIRANA-DOCUMENTATION.md
│   ├── angular19-spartacus-learning-guide.md
│   ├── spartacus-architecture-mental-model.md
│   └── deployment-roadmap.md
│
├── angular.json                          # Angular CLI config
├── package.json                          # Dependencies
├── tsconfig.json                         # TypeScript config
└── README.md                             # Project readme
```

---

## 🧩 Components Guide

### Home Component

**Location**: `src/app/features/home/home.component.ts`

**Purpose**: Main landing page with promotional content and product showcases

**Key Features**:
- Custom header with GT Kirana branding
- Auto-rotating promotional carousel
- Featured products section
- Bestsellers section
- Category-specific product sections
- Category promotional cards
- CMS content integration

**Template Structure**:
```html
<div class="home-container">
  <!-- Custom Header -->
  <header class="custom-header">
    <!-- Logo, Search, Cart, User Actions -->
  </header>

  <!-- Hero Banner -->
  <section class="hero-banner">
    <!-- Product showcase grid -->
  </section>

  <!-- Promotional Carousel -->
  <section class="promo-carousel">
    <!-- Auto-rotating slides -->
  </section>

  <!-- Product Sections -->
  <section class="product-section">
    <!-- Featured, Bestsellers, Snacks -->
  </section>

  <!-- Category Cards -->
  <section class="category-cards">
    <!-- Pharmacy, Pet Care, Baby Care -->
  </section>

  <!-- CMS Content -->
  <app-cms-page-layout />
</div>
```

**Carousel Implementation**:
```typescript
export class HomeComponent implements OnInit {
  currentSlide = signal(0);
  private carouselInterval?: number;

  ngOnInit() {
    this.startCarousel();
  }

  startCarousel() {
    this.carouselInterval = window.setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  nextSlide() {
    const current = this.currentSlide();
    this.currentSlide.set((current + 1) % this.promoSlides.length);
  }

  ngOnDestroy() {
    if (this.carouselInterval) {
      clearInterval(this.carouselInterval);
    }
  }
}
```

### Product List Component

**Location**: `src/app/features/product-list/product-list.component.ts`

**Purpose**: Display products with search, filter, and sort capabilities

**Key Features**:
- Grid/List view toggle
- Category filter
- Price range filter
- Search functionality
- Sort options
- Pagination
- Add to cart quick action

### Product Details Component

**Location**: `src/app/features/product-details/product-details.component.ts`

**Purpose**: Show detailed product information

**Key Features**:
- Product images
- Price and discount
- Stock availability
- Add to cart/wishlist
- Product description
- Nutritional information
- Related products

### Cart Component

**Location**: `src/app/features/cart/cart.component.ts`

**Purpose**: Manage shopping cart items

**Key Features**:
- Item list with images
- Quantity controls
- Remove items
- Cart summary
- Apply coupons
- Proceed to checkout

### Checkout Component

**Location**: `src/app/features/checkout/checkout.component.ts`

**Purpose**: Complete the purchase process

**Key Features**:
- Delivery address selection
- Delivery slot selection
- Payment method selection
- Order summary
- Place order

---

## 🔄 State Management

### GroceryFacade

**Location**: `src/app/facades/grocery.facade.ts`

**Purpose**: Central business logic and state management for the grocery store

**Key Signals**:
```typescript
// Product state
private productsSignal = signal<Product[]>([]);
private categoriesSignal = signal<Category[]>([]);
private selectedCategorySignal = signal<string | null>(null);

// Cart state
private cartSignal = signal<CartItem[]>([]);
private cartTotalSignal = computed(() => 
  this.cartSignal().reduce((sum, item) => sum + item.total, 0)
);

// Wishlist state
private wishlistSignal = signal<WishlistItem[]>([]);

// User state
private userSignal = signal<User | null>(null);
private ordersSignal = signal<Order[]>([]);

// UI state
private loadingSignal = signal<boolean>(false);
private errorSignal = signal<string | null>(null);
```

**Key Methods**:
```typescript
// Product operations
loadProducts(): void
getProductById(id: string): Product | undefined
searchProducts(query: string): Product[]
filterByCategory(category: string): void

// Cart operations
addToCart(product: Product, quantity: number): void
updateCartItemQuantity(productId: string, quantity: number): void
removeFromCart(productId: string): void
clearCart(): void

// Wishlist operations
addToWishlist(product: Product): void
removeFromWishlist(productId: string): void
moveToCart(productId: string): void

// Order operations
placeOrder(orderDetails: OrderDetails): Observable<Order>
getOrders(): Order[]
cancelOrder(orderId: string): void
```

**LocalStorage Persistence**:
```typescript
constructor() {
  // Load from localStorage on init
  this.loadCartFromStorage();
  this.loadWishlistFromStorage();

  // Save to localStorage on changes
  effect(() => {
    localStorage.setItem('cart', JSON.stringify(this.cartSignal()));
  });

  effect(() => {
    localStorage.setItem('wishlist', JSON.stringify(this.wishlistSignal()));
  });
}
```

---

## 🌐 API Integration

### Mock API Structure

**Location**: `public/mock-api/`

**Files**:
1. `grocery-products.json` - 40 base products
2. `extended-products.json` - 60+ additional products
3. `home-layout.json` - CMS layout data
4. `product.json` - Product details

### Product Data Model

```typescript
interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  unit: string;
  image: string;
  description: string;
  brand: string;
  stock: number;
  rating: number;
  reviews: number;
  tags: string[];
  nutritionalInfo?: NutritionalInfo;
  ingredients?: string[];
}
```

### API Endpoints (Mock)

```typescript
// Products
GET /mock-api/grocery-products.json
GET /mock-api/extended-products.json

// CMS
GET /mock-api/home-layout.json

// Future real API endpoints
GET /api/products
GET /api/products/:id
GET /api/categories
POST /api/cart
POST /api/orders
GET /api/user/orders
```

### Adapter Pattern

```typescript
@Injectable({ providedIn: 'root' })
export class GroceryAdapter {
  private readonly http = inject(HttpClient);
  private readonly config = inject(AppConfigService);

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(
      `${this.config.apiUrl}/mock-api/grocery-products.json`
    ).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('API Error:', error);
    return throwError(() => new Error('API request failed'));
  }
}
```

---

## 🎨 Styling Guide

### Design System

**Color Palette**:
```scss
// Primary colors
$primary-green: #2ecc71;
$secondary-green: #27ae60;
$light-green: #e8f8f0;

// Accent colors
$cyan: #4ecdc4;
$yellow: #f9ca24;
$pink: #ff6b9d;
$danger-color: #e74c3c;
$accent-color: #f39c12;

// Neutral colors
$text-dark: #2c3e50;
$text-light: #7f8c8d;
$white: #ffffff;
$gray-100: #f8f9fa;
$gray-200: #e9ecef;
```

**Typography**:
```scss
$font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
$font-size-base: 16px;
$line-height-base: 1.5;

// Headings
$h1-size: 2.5rem;
$h2-size: 2rem;
$h3-size: 1.75rem;
$h4-size: 1.5rem;
```

**Spacing**:
```scss
$spacing-xs: 0.25rem;  // 4px
$spacing-sm: 0.5rem;   // 8px
$spacing-md: 1rem;     // 16px
$spacing-lg: 1.5rem;   // 24px
$spacing-xl: 2rem;     // 32px
$spacing-2xl: 3rem;    // 48px
```

**Breakpoints**:
```scss
$breakpoint-mobile: 480px;
$breakpoint-tablet: 768px;
$breakpoint-desktop: 1024px;
$breakpoint-wide: 1440px;
```

### Component Styling

**Product Card**:
```scss
.product-card {
  background: white;
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  }

  .product-image {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 8px;
  }

  .product-name {
    font-size: 1rem;
    font-weight: 600;
    color: $text-dark;
    margin: 0.5rem 0;
  }

  .product-price {
    font-size: 1.25rem;
    font-weight: 700;
    color: $primary-green;
  }
}
```

**Responsive Design**:
```scss
.product-grid {
  display: grid;
  gap: 1.5rem;

  // Mobile: 1 column
  grid-template-columns: 1fr;

  // Tablet: 2 columns
  @media (min-width: $breakpoint-tablet) {
    grid-template-columns: repeat(2, 1fr);
  }

  // Desktop: 3 columns
  @media (min-width: $breakpoint-desktop) {
    grid-template-columns: repeat(3, 1fr);
  }

  // Wide: 4 columns
  @media (min-width: $breakpoint-wide) {
    grid-template-columns: repeat(4, 1fr);
  }
}
```

---

## 🛠️ Development Workflow

### Adding a New Feature

1. **Create Feature Module**
```bash
ng generate component features/my-feature --standalone
```

2. **Add Route**
```typescript
// app.routes.ts
export const routes: Routes = [
  {
    path: 'my-feature',
    loadComponent: () => import('./features/my-feature/my-feature.component')
      .then(m => m.MyFeatureComponent)
  }
];
```

3. **Create Facade (if needed)**
```typescript
// facades/my-feature.facade.ts
@Injectable({ providedIn: 'root' })
export class MyFeatureFacade {
  private dataSignal = signal<Data[]>([]);
  readonly data = this.dataSignal.asReadonly();

  loadData(): void {
    // Implementation
  }
}
```

4. **Create Connector**
```typescript
// occ/connector/my-feature.connector.ts
@Injectable({ providedIn: 'root' })
export class MyFeatureConnector {
  private adapter = inject(MyFeatureAdapter);

  getData(): Observable<Data[]> {
    return this.adapter.getData();
  }
}
```

5. **Create Adapter**
```typescript
// occ/adapter/my-feature.adapter.ts
@Injectable({ providedIn: 'root' })
export class MyFeatureAdapter {
  private http = inject(HttpClient);

  getData(): Observable<Data[]> {
    return this.http.get<Data[]>('/api/data');
  }
}
```

### Code Style Guidelines

**TypeScript**:
- Use strict mode
- Prefer `const` over `let`
- Use arrow functions
- Use optional chaining (`?.`)
- Use nullish coalescing (`??`)

**Angular**:
- Use standalone components
- Use signals for state
- Use `inject()` for dependency injection
- Use new control flow (`@if`, `@for`)
- Use `OnPush` change detection

**SCSS**:
- Use BEM naming convention
- Use variables for colors and spacing
- Mobile-first responsive design
- Use mixins for reusable styles

---

## 🧪 Testing

### Unit Tests

**Component Test Example**:
```typescript
describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should start carousel on init', () => {
    component.ngOnInit();
    expect(component.currentSlide()).toBe(0);
  });

  it('should advance to next slide', () => {
    component.nextSlide();
    expect(component.currentSlide()).toBe(1);
  });
});
```

**Facade Test Example**:
```typescript
describe('GroceryFacade', () => {
  let facade: GroceryFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    facade = TestBed.inject(GroceryFacade);
  });

  it('should add product to cart', () => {
    const product = { id: '1', name: 'Apple', price: 100 };
    facade.addToCart(product, 2);
    
    expect(facade.cart().length).toBe(1);
    expect(facade.cart()[0].quantity).toBe(2);
  });

  it('should calculate cart total', () => {
    facade.addToCart({ id: '1', price: 100 }, 2);
    facade.addToCart({ id: '2', price: 50 }, 1);
    
    expect(facade.cartTotal()).toBe(250);
  });
});
```

### E2E Tests

```typescript
describe('GT Kirana E2E', () => {
  it('should display home page', () => {
    cy.visit('/');
    cy.contains('GT Kirana').should('be.visible');
  });

  it('should add product to cart', () => {
    cy.visit('/');
    cy.get('.product-card').first().find('.add-button').click();
    cy.get('.cart-count').should('contain', '1');
  });

  it('should complete checkout', () => {
    cy.visit('/cart');
    cy.get('.checkout-button').click();
    cy.get('input[name="address"]').type('123 Main St');
    cy.get('.place-order-button').click();
    cy.contains('Order placed successfully').should('be.visible');
  });
});
```

---

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

**Output**: `dist/angular-self-code/browser/`

### Deployment Options

#### 1. Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

**vercel.json**:
```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist/angular-self-code/browser"
      }
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

#### 2. Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod
```

**netlify.toml**:
```toml
[build]
  command = "npm run build"
  publish = "dist/angular-self-code/browser"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

#### 3. Firebase Hosting

```bash
# Install Firebase CLI
npm i -g firebase-tools

# Login
firebase login

# Initialize
firebase init hosting

# Deploy
firebase deploy
```

#### 4. AWS S3 + CloudFront

```bash
# Build
npm run build

# Upload to S3
aws s3 sync dist/angular-self-code/browser/ s3://your-bucket-name

# Invalidate CloudFront cache
aws cloudfront create-invalidation --distribution-id YOUR_DIST_ID --paths "/*"
```

### Environment Configuration

**Production Environment** (`src/enviornments/environment.ts`):
```typescript
export const environment = {
  production: true,
  apiUrl: 'https://api.gtkirana.com',
  features: {
    enableCms: true,
    enableAnalytics: true,
    enablePWA: true
  }
};
```

**Development Environment** (`src/enviornments/environment.development.ts`):
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:4200',
  features: {
    enableCms: true,
    enableAnalytics: false,
    enablePWA: false
  }
};
```

---

## 🔮 Future Enhancements

### Phase 1: Core Improvements
- [ ] Real-time inventory updates
- [ ] Advanced search with filters
- [ ] Product recommendations
- [ ] User reviews and ratings
- [ ] Social sharing

### Phase 2: Advanced Features
- [ ] Voice search
- [ ] Barcode scanner
- [ ] Recipe suggestions
- [ ] Meal planning
- [ ] Subscription orders

### Phase 3: Business Features
- [ ] Vendor management
- [ ] Inventory management
- [ ] Analytics dashboard
- [ ] Customer support chat
- [ ] Loyalty program

### Phase 4: Technical Improvements
- [ ] Progressive Web App (PWA)
- [ ] Server-Side Rendering (SSR)
- [ ] GraphQL API
- [ ] Microservices architecture
- [ ] Real-time notifications

### Phase 5: Integration
- [ ] Payment gateway integration
- [ ] SMS notifications
- [ ] Email marketing
- [ ] Social media login
- [ ] Third-party delivery services

---

## 📞 Support & Contact

### Documentation
- **Main Docs**: `docs/GT-KIRANA-DOCUMENTATION.md`
- **Architecture Guide**: `docs/spartacus-architecture-mental-model.md`
- **Development Guide**: `docs/spartacus-angular-development-workflow.md`

### Resources
- **Angular Docs**: https://angular.dev
- **SAP Composable Storefront**: https://sap.github.io/spartacus-docs/
- **TypeScript Docs**: https://www.typescriptlang.org/docs/

### Contributing
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Write tests
5. Submit a pull request

---

## 📄 License

This project is licensed under the MIT License.

---

## 🎉 Acknowledgments

- Angular team for the amazing framework
- SAP for the Composable Storefront architecture
- All contributors and testers

---

**Built with ❤️ by the GT Kirana Team**

*Last Updated: April 3, 2026*