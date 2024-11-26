import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ProductComponent } from './product/product.component';
import { Product } from './product/product.types';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FooterComponent, HeaderComponent, ProductComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'smickers';
  product: Product = {
    id: '1',
    title: 'Air Force 1',
    description: 'A pair of comfortable and stylish basketball shoes.',
    photo: 'https://images.laced.com/products/28ceea49-a3ef-40a7-81db-3c1dc68f3233.jpg?auto=format&fit=max&w=750&q=75', 
    price: 120,
    stock: 99
  }; 
}
