import { Component, Input, Output } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MyProductService } from '../my-product.service';
import { FormsModule } from '@angular/forms';

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

  constructor(private productService: MyProductService) {}

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

    const products = this.productService.products.filter(product => 
      product.title.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query)
    );

    console.log('Résultats de recherche:', products);
  }
}