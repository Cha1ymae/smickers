import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MyProductService } from '../my-product.service';
import { ProductComponent } from "../product/product.component";
import { NgFor, NgIf } from '@angular/common';
import { Product } from '../product/product.types';
import { take } from 'rxjs/operators';

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
  filteredProducts: Product[] = [];
  loading: boolean = false;

  constructor(
    private productService: MyProductService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.productService.getCategories().pipe(take(1)).subscribe({
      next: (response) => {
        this.productService.allCategories = response.data;
        console.log('Catégories chargées :', this.productService.allCategories);
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des catégories', err);
      },
    });
  }

  navigateToSeason(season: string): void {
    this.categoryName = season;
    this.filteredProducts = []; // Réinitialise la liste des produits
    this.loading = true;

    console.log(`Chargement des produits pour la saison : ${season}`);

    const selectedCategory = this.productService.allCategories.find(
      (category) => category.name.toLowerCase() === season.toLowerCase()
    );

    if (selectedCategory) {
      this.productService.getProductByCategorieId(selectedCategory.id).pipe(take(1)).subscribe({
        next: (response) => {
          this.filteredProducts = response.products || [];
          console.log(`Produits filtrés pour la catégorie ${season}:`, this.filteredProducts);
          this.loading = false;
        },
        error: (err) => {
          console.error('Erreur lors de la récupération des produits', err);
          this.filteredProducts = [];
          this.loading = false;
        },
      });
    } else {
      console.error(`Catégorie ${season} non trouvée.`);
      this.filteredProducts = [];
      this.loading = false;
    }
  }
}
