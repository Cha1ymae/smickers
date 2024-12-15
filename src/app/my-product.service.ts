import { Injectable } from '@angular/core';
import { Product } from './product/product.types';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

type Category = {
  id: string;
  name: string;
  products: Product[];
};
type CategoriesData = {
  data: Category[];
  hasNextPage: boolean;
};
type ProductsData = {
  data: Product[];
  hasNextPage: boolean;
};

@Injectable({
  providedIn: 'root',
})
export class MyProductService {
  apiUrl: string = 'https://enigma-smickers-backend-73e446c36fde.herokuapp.com';
  allCategories: Category[] = [];
  allProducts: Product[] = [];

  constructor(private http: HttpClient) {}

  getCategories(): Observable<CategoriesData> {
    return this.http.get<CategoriesData>(`${this.apiUrl}/api/v1/categories`);
  }

  getProductsByCategoryId(categoryId: string): Observable<ProductsData> {
    return this.http.get<ProductsData>(`${this.apiUrl}/api/v1/categories/${categoryId}`);
  }

  getAllProducts(): Observable<ProductsData> {
    return this.http.get<ProductsData>(`${this.apiUrl}/api/v1/products`);
  }
  getProductByCategorieId(categoryId: string): Observable<{ products: Product[] }> {
    return this.http.get<{ products: Product[] }>(`${this.apiUrl}/api/v1/categories/${categoryId}`);
  }
  
}
