import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MyProductService } from '../my-product.service';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { Product } from '../product/product.types';

@Component({
  standalone: true,
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    RouterModule,
    NgIf,
    NgFor,
],
})
export class HeaderComponent {
  searchQuery: string = '';
  searchResults: Product[] = [];

  constructor(private productService: MyProductService, private router: Router) {
    this.productService.loadAllProducts().subscribe({
      next: (data) => {
        console.log('Produits chargés', data);
      },
      error: (err) => {
        console.error('Erreur lors du chargement des produits', err);
      }
    });
  }

  scrollTo(sectionId: string): void {
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }
  }
  handleSearch(): void {
    const query = this.searchQuery.trim().toLowerCase();
    if (!query) {
      console.log('Veuillez saisir un terme de recherche.');
      return;
    }

    this.productService.searchProducts(query).subscribe({
      next: (results) => {
        this.searchResults = results; 
        if (results.length === 0) {
          console.log('Aucun produit trouvé.');
        } else {
          console.log('Résultats de la recherche:', this.searchResults);
        }
      },
      error: (err) => {
        console.error('Erreur lors de la recherche:', err);
      },
    });
  }

  navigateToCategory(category: string): void {
    this.router.navigate(['/category', category]);
  }

  navigateToProducts(products: string): void {
    this.router.navigate(['/', products]);
  }
  goToPanier(): void {
    this.router.navigate(['/panier']);
  }
}
