import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MyProductService } from '../my-product.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule
  ],
})
export class HeaderComponent {
  searchQuery: string = '';

  constructor(private productService: MyProductService, private router: Router) {}

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
