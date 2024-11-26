import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from './footer/footer.component';
import { ProductComponent } from './product/product.component';
import { Product } from './product/product.types';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FooterComponent, HeaderComponent, ProductComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'smickers';
  product: Product = 
    {
      id: '1',
      title: 'Basketball Shoes',
      description: 'A pair of comfortable and stylish basketball shoes.',
      photo: '',
      price: 120,
      stock: 99
    }
}
