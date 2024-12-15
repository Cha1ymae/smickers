import { Component, Input } from '@angular/core';
import { PanierService, CartItem } from '../panier.service';
import { Product } from './product.types';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe, NgStyle } from '@angular/common'; 

@Component({
  selector: 'app-product',
  imports : [CurrencyPipe, FormsModule, NgStyle],
  template: `
    <div class="product">
      <img
        [src]="productImage"
        class="product-image"
        alt="{{ product?.title }}"
      />
      <div class="product-info">
        <h1>{{ product?.title  }}</h1>
        <h2>{{ product?.price | currency : 'EUR' : 'symbol' }}</h2>
        <p>{{ product?.description }}</p>
      </div>
      <label>Taille :</label>
      <select [(ngModel)]="selectedSize">
        <option value="S">S</option>
        <option value="M">M</option>
        <option value="L">L</option>
        <option value="XL">XL</option>
      </select>

      <label>Quantité :</label>
      <input type="number" [(ngModel)]="quantity" min="1" />

      <button
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
  selectedSize: string = 'M';
  quantity: number = 1; 

  constructor(private panierService: PanierService) {}

  onAddToCart() {
    if (this.product?.stock && this.product?.stock > 0) {
      this.product.stock -= this.quantity;
      console.log(`Stock restant : ${this.product?.stock}`);

      const cartItem: CartItem = {
        id: this.product.id,
        title: this.product.title,
        price: this.product.price,
        size: this.selectedSize,
        quantity: this.quantity,
        photo: this.product.photo,
      };

      this.panierService.addToCart(cartItem);
      
      this.addedToCart = true;
      console.log('Produit ajouté au panier', this.product?.title);

      setTimeout(() => {
        this.addedToCart = false;
      }, 5000);
    } else {
      console.log('Stock épuisé, impossible d\'ajouter au panier');
    }
  }

  get productImage(): string {
    return this.product?.photo?.trim()
      ? this.product.photo
      : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0Y2SLfdkXPJMxZ2QtRIK1fy2Lvnr6UVgmzQ&s';
  }
}
