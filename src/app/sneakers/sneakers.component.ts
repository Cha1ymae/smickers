import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../product/product.types';
import { MyProductService } from '../my-product.service';
import { ProductComponent } from "../product/product.component";
import { SeasonCarouselComponent } from "../season-carousel/season-carousel.component";
import { NewsLetterComponent } from "../news-letter/news-letter.component";


@Component({
  selector: 'app-sneakers',
  imports: [ProductComponent, SeasonCarouselComponent, NewsLetterComponent, CommonModule],
  templateUrl: './sneakers.component.html',
  styleUrl: './sneakers.component.css'
})
export class SneakersComponent implements OnInit{
  myProducts = signal<Product[]>([]);

  inStock = computed(() => this.myProducts().filter((product) => product.stock > 0));

  selectedCategory: string = '';

  constructor(private myProductService: MyProductService) {}

  ngOnInit(): void {
    this.myProductService.getAllProducts().subscribe((response) => {
      this.myProducts.set(response.data);
    });
  }

  onSeasonChanged(season: string): void {
    this.selectedCategory = season;
  }

  scrollToProducts(): void {
    const productSection = document.getElementById('product-section');
    if (productSection) {
      productSection.scrollIntoView({ behavior: 'smooth' });
    }
  }
 
  }

