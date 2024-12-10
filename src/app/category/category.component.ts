import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MyProductService } from '../my-product.service';
import { Product } from '../product/product.types';
import { CommonModule } from '@angular/common';
import { ProductComponent } from '../product/product.component';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, ProductComponent],
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  categoryName: string = '';
  products: Product[] = [];
  seasons: string[] = ['Hiver', 'Été', 'Printemps', 'Automne'];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: MyProductService
  ) {}

  navigateToSeason(season: string): void {
    this.router.navigate(['/category', season.toLowerCase()]);
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const season = params.get('season');
      if (season) {
        this.categoryName = season;
        this.productService
          .getProductByCategorie(this.categoryName.toLowerCase())
          .subscribe((products) => (this.products = products));
      }
    });
  }
}
