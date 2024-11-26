import { Component,Input } from '@angular/core';
import { Product } from './product.types';
@Component({
  selector: 'app-product',
  template: `<div class="product">
  <img src="{{ product?.photo }}" class="product-image" alt="Product"/> 
  <div  class="product-info">
      <h1>{{ product?.title }} Title</h1>
      <h1>{{ product?.price }} Price</h1>
      <p>{{ product?.description }} Description</p>
  </div>
</div>
`,
  styleUrl: './product.component.css'
})
export class ProductComponent {
  protected product?: Product;
}


