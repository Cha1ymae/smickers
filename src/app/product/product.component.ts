import { Component, Input } from '@angular/core';
import { Product } from './product.types';

@Component({
  selector: 'app-product',
  template: `
    <div class="product">
      <img 
        [src]="product?.photo || 'assets/default-product.jpg'" 
        class="product-image" 
        alt="{{ product?.title }}" 
      />
      <div class="product-info">
        <h1>{{ product?.title }}</h1>
        <h2>{{ product?.price }} €</h2>
        <p>{{ product?.description }}</p>
      </div>
    </div>
  `,
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  @Input() product?: Product;
}
