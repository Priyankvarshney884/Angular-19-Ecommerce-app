import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CmsPageLayoutComponent } from '../../cms/page-layout/cms-page-layout.component';
import { CmsFacade } from '../../facades/cms.facade';
import { AppConfigService } from '../../core/config/app-config.service';

interface PromoSlide {
  id: number;
  title: string;
  subtitle: string;
  discount: string;
  image: string;
  color: string;
}

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  image: string;
  unit: string;
  rating: number;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CmsPageLayoutComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  readonly cmsFacade = inject(CmsFacade);
  private readonly appConfig = inject(AppConfigService);

  readonly cmsEnabled = this.appConfig.features.enableCms;
  
  // Carousel state
  currentSlide = signal(0);
  
  // Promotional slides
  promoSlides: PromoSlide[] = [
    {
      id: 1,
      title: 'Mega Weekend Sale',
      subtitle: 'Up to 50% OFF on Fresh Fruits & Vegetables',
      discount: '50% OFF',
      image: '🥗',
      color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    {
      id: 2,
      title: 'Dairy Products Special',
      subtitle: 'Buy 2 Get 1 Free on All Dairy Items',
      discount: 'BOGO',
      image: '🥛',
      color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    },
    {
      id: 3,
      title: 'Staples Super Saver',
      subtitle: 'Flat ₹200 OFF on orders above ₹1499',
      discount: '₹200 OFF',
      image: '🌾',
      color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    }
  ];
  
  // Featured products
  featuredProducts: Product[] = [
    { id: 'P001', name: 'Fresh Bananas', price: 40, originalPrice: 50, discount: 20, image: '🍌', unit: 'dozen', rating: 4.5 },
    { id: 'P002', name: 'Red Apples', price: 180, originalPrice: 200, discount: 10, image: '🍎', unit: 'kg', rating: 4.7 },
    { id: 'P003', name: 'Fresh Milk', price: 60, image: '🥛', unit: '1L', rating: 4.8 },
    { id: 'P004', name: 'Whole Wheat Bread', price: 35, image: '🍞', unit: '400g', rating: 4.6 },
    { id: 'P005', name: 'Farm Eggs', price: 70, image: '🥚', unit: '6 pcs', rating: 4.8 },
    { id: 'P006', name: 'Fresh Tomatoes', price: 30, originalPrice: 40, discount: 25, image: '🍅', unit: 'kg', rating: 4.3 },
  ];
  
  // Bestsellers
  bestsellers: Product[] = [
    { id: 'B001', name: 'Basmati Rice', price: 180, originalPrice: 200, discount: 10, image: '🍚', unit: '1kg', rating: 4.7 },
    { id: 'B002', name: 'Toor Dal', price: 140, originalPrice: 160, discount: 13, image: '🫘', unit: '1kg', rating: 4.5 },
    { id: 'B003', name: 'Refined Oil', price: 180, image: '🛢️', unit: '1L', rating: 4.4 },
    { id: 'B004', name: 'Sugar', price: 45, image: '🧂', unit: '1kg', rating: 4.3 },
    { id: 'B005', name: 'Tea Powder', price: 180, originalPrice: 200, discount: 10, image: '🍵', unit: '500g', rating: 4.7 },
    { id: 'B006', name: 'Atta Flour', price: 45, image: '🌾', unit: '1kg', rating: 4.6 },
  ];
  
  // Snacks
  snacks: Product[] = [
    { id: 'S001', name: 'Lays Chips', price: 20, image: '🥔', unit: '52g', rating: 4.5 },
    { id: 'S002', name: 'Parle-G Biscuits', price: 10, image: '🍪', unit: '100g', rating: 4.8 },
    { id: 'S003', name: 'Maggi Noodles', price: 12, image: '🍜', unit: '70g', rating: 4.7 },
    { id: 'S004', name: 'Kurkure', price: 20, image: '🌽', unit: '85g', rating: 4.6 },
    { id: 'S005', name: 'Oreo Cookies', price: 30, image: '🍪', unit: '120g', rating: 4.8 },
    { id: 'S006', name: 'Haldiram Bhujia', price: 50, image: '🥜', unit: '200g', rating: 4.7 },
  ];

  ngOnInit(): void {
    if (this.cmsEnabled) {
      void this.cmsFacade.loadHomeLayout();
    }
    
    // Auto-rotate carousel
    this.startCarousel();
  }
  
  startCarousel(): void {
    setInterval(() => {
      this.nextSlide();
    }, 5000); // Change slide every 5 seconds
  }
  
  nextSlide(): void {
    this.currentSlide.update(current => 
      (current + 1) % this.promoSlides.length
    );
  }
  
  prevSlide(): void {
    this.currentSlide.update(current => 
      current === 0 ? this.promoSlides.length - 1 : current - 1
    );
  }
  
  goToSlide(index: number): void {
    this.currentSlide.set(index);
  }
}

// Made with Bob
