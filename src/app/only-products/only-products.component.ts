import { Component, OnInit, computed, signal } from '@angular/core';
import { ProductComponent } from "../product/product.component";
import { Product } from '../product/product.types';
import { MyProductService } from '../my-product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-only-products',
  standalone: true, 
  imports: [ProductComponent, CommonModule], 
  template: `
    <div id="product-section" class="product-grid">
      <app-product *ngFor="let product of inStock()" [product]="product"></app-product>
    </div>
  `,
  styleUrls: ['./only-products.component.css'] 
})
export class OnlyProductsComponent implements OnInit {
  myProducts = signal<Product[]>([]);

  inStock = computed(() => this.myProducts().filter((product) => product.stock > 0));

  constructor(private myProductService: MyProductService) {}

  ngOnInit(): void {
    this.myProductService.getAllProducts().subscribe({
      next: (response) => {
        this.myProducts.set(response.data);
      },
      error: (err) => {
        console.error('Erreur lors du chargement des produits :', err);
      }
    });
  }
}
