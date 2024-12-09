import { Component, Input, inject } from '@angular/core';
import { UpperCasePipe, NgIf, NgStyle, CurrencyPipe } from '@angular/common';
import { Product } from './product.types';

@Component({
  selector: 'app-product',
  imports: [NgStyle, UpperCasePipe, CurrencyPipe],
  template: `
    <div class="product">
      <img
        [src]="productImage"
        class="product-image"
        alt="{{ product?.title }}"
      />
      <div class="product-info">
        <h1>{{ product?.title | uppercase }}</h1>
        <h2>{{ product?.price | currency : 'EUR' : 'symbol' }}</h2>
        <p>{{ product?.description }}</p>
      </div>
      <button
        class="add-to-cart"
        [disabled]="product?.stock === 0"
        class="add-to-cart"
        [disabled]="product?.stock === 0"
        (click)="onAddToCart()"
        [ngStyle]="{
          'background-color': addedToCart ? 'green' : (product?.stock === 0 ? 'gray' : 'red'),
          'cursor': product?.stock === 0 ? 'not-allowed' : 'pointer',
          color: 'white'
        }"
      >
        {{ product?.stock === 0 ? 'Pas de stock' : (addedToCart ? 'Ajouté au panier' : 'Ajouter au panier') }}
      </button>
    </div>
  `,
  styleUrls: ['./product.component.css'],
})
export class ProductComponent {
  @Input() product?: Product;
  addedToCart: boolean = false;
  onAddToCart() {
    if (this.product?.stock && this.product?.stock > 0) {
      this.product.stock--;
      console.log(`Stock restant : ${this.product?.stock}`);
    this.addedToCart = true;
    console.log('Produit ajouté au panier', this.product?.title);
    setTimeout(() => {
      this.addedToCart = false;
    }, 5000);
  }else {
      console.log('Stock épuisé, impossible d\'ajouter au panier');
    }
  }
  get productImage(): string {
    return this.product?.photo?.trim()
      ? this.product.photo
      : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0Y2SLfdkXPJMxZ2QtRIK1fy2Lvnr6UVgmzQ&s';
  }
}
