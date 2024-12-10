import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MyProductService } from '../my-product.service';
import { Product } from '../product/product.types';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  categoryName: string = '';
  products: Product[] = [];

  constructor(
    private route: ActivatedRoute,
    private productService: MyProductService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.categoryName = params.get('season') || '';
      this.productService
        .getProductByCategorie(this.categoryName.toLowerCase())
        .subscribe((products) => (this.products = products));
    });
  }
}
