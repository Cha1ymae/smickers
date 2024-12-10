import { Injectable } from '@angular/core';
import { Product } from './product/product.types';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

type ProductsData = 
{
  data : Array<Product>,
  hasNextPage : boolean;
}
@Injectable({
  providedIn: 'root'
})
export class MyProductService {
  products?: Product;
  apiUrl : String = 'https://enigma-smickers-backend-73e446c36fde.herokuapp.com'
  constructor(private http : HttpClient) { }

    getProducts(): Observable<ProductsData> {
      return this.http.get<ProductsData>(`${this.apiUrl}/api/v1/products`);
    }
  
    getProductById(id: number): Observable<Array<Product>> {
      return this.http.get<Product[]>(`${this.apiUrl}/api/v1/products/${id}`);
    }

    getProductByName(title : string): Observable<Array<Product>> {
      return this.http.get<Product[]>(`${this.apiUrl}/api/v1/products/byTitle/${title}`);
    }
  
    getProductByCategorie(category: string): Observable<Product[]> {
      return this.http.get<Product[]>(`${this.apiUrl}/api/v1/products?category=${category}`);
    }    
    
  

}
