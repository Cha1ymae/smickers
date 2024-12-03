import { Component, Input } from '@angular/core';
import { NgClass, NgIf, NgStyle } from '@angular/common';
import { Product } from './product.types';

@Component({
  selector: 'app-product',
  imports: [NgStyle,NgIf],
  template: `
    <div class="product">
      <img 
      [src]=productImage
        class="product-image" 
        alt="{{ product?.title }}" 
      />
      <div class="product-info">
        <h1>{{ product?.title }}</h1>
        <h2>{{ product?.price }}€</h2>
        <p>{{ product?.description }}</p>
      </div>
      <button 
      class="add-to-cart"
      *ngIf="product?.stock != 0" 
      [disabled]="product?.stock === 0"   
      (click)="onAddToCart()"
      [ngStyle]="{ 
              'background-color': addedToCart ? 'green' : 'red',
              'color': 'white'  }">
  {{ addedToCart ? 'Ajouté au panier' : 'Ajouter au panier' }}
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
    console.log('Produit ajouté au panier',this.product?.title);
    setTimeout(() => {
      this.addedToCart = false;
    }, 5000);
  }
  get productImage(): string {
    return this.product?.photo?.trim() 
      ? this.product.photo 
      : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0Y2SLfdkXPJMxZ2QtRIK1fy2Lvnr6UVgmzQ&s';
  }
   messageAffich = () =>
  {

    return ;
  }
}
