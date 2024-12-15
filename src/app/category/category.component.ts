import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MyProductService } from '../my-product.service';
import { ProductComponent } from "../product/product.component";
import { NgFor, NgIf } from '@angular/common';
import { Product } from '../product/product.types';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  standalone: true,
  imports: [ProductComponent, NgIf, NgFor],
})
export class CategoryComponent implements OnInit {
  seasons: string[] = ['hiver', 'printemps', 'été', 'automne'];
  
  categoryName: string | null = null;
  allProducts: Product[] = [];
  filteredProducts: Product[] = [];
  selectedCategoryId: string | null = null;
  loading: boolean = true;

  constructor(
    private productService: MyProductService, 
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.productService.getCategories().subscribe({
      next: (response) => {
        this.productService.allCategories = response.data;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des catégories', err);
      },
    });
  }

  navigateToSeason(season: string): void {
    this.categoryName = season; 
    const selectedCategory = this.productService.allCategories.find(
      (category) => category.name.toLowerCase() === season.toLowerCase()
    );

    if (selectedCategory) {
      this.productService.getProductByCategorieId(selectedCategory.id).subscribe({
        next: (response) => {
          this.filteredProducts = response.products || [];  
          console.log(`Produits filtrés pour la catégorie ${season}:`, this.filteredProducts);
          this.loading = false;

        },
        error: (err) => {
          console.error('Erreur lors de la récupération des produits pour la catégorie', err);
          this.filteredProducts = [];
        },
      });
      
      
    }
  }
}
