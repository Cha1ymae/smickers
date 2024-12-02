import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';
import { Product } from './product.types';

@Component({
  selector: 'app-product',
  imports: [NgClass],
  template: `
    <div class="product">
      <img 
      [src]=productImage
        class="product-image" 
        alt="{{ product?.title }}" 
      />
      <div class="product-info">
        <h1>{{ product?.title }}</h1>
        <h2>{{ product?.price }} €</h2>
        <p>{{ product?.description }}</p>
      </div>
      <button class="add-to-cart" 
              [disabled]="product && +product.stock === 0"   
              (click)="onAddToCart()"
              [ngClass]="{ 'added': addedToCart }"> {{ addedToCart ? 'Article ajouté' : 'Ajouter au panier' }}
      </button>
    </div>
  `,
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  @Input() product?: Product;
  addedToCart: boolean = false;
  onAddToCart() {
    this.addedToCart = true; 
    console.log('Produit ajouté au panier');
    setTimeout(() => {
      this.addedToCart = false;
    }, 5000);
  }
  get productImage(): string {
    return this.product?.photo?.trim() 
      ? this.product.photo 
      : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0Y2SLfdkXPJMxZ2QtRIK1fy2Lvnr6UVgmzQ&s';
  }
  
}
