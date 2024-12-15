import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

export interface CartItem {
  id: string;
  title: string;
  price: number;
  size: string;
  quantity: number;
  photo: string;
}

@Injectable({
  providedIn: 'root',
})
export class PanierService {
  private apiUrl = 'https://enigma-smickers-backend-73e446c36fde.herokuapp.com/api/v1/cart';
  private cartItems: CartItem[] = [];
  private cartSubject = new BehaviorSubject<CartItem[]>([]);

  constructor(private http: HttpClient) {}

  fetchCart(): void {
    this.http.get<CartItem[]>(this.apiUrl).subscribe((items) => {
      this.cartItems = items;
      this.cartSubject.next(this.cartItems);
    });
  }

  addToCart(item: CartItem): void {
    const payload = {
      productId: item.id,
      size: item.size,
      quantity: item.quantity,
    };

    this.http.patch<CartItem>(this.apiUrl, payload).subscribe(() => {
      this.fetchCart(); 
    });
  }

  updateQuantity(itemId: string, size: string, quantity: number): void {
    const payload = { itemId, size, quantity };
    this.http.patch(`${this.apiUrl}`, payload).subscribe(() => {
      this.fetchCart();
    });
  }

  removeItem(itemId: string, size: string): void {
    this.http
      .delete(`${this.apiUrl}/${itemId}`, { params: { size } })
      .subscribe(() => {
        this.fetchCart();
      });
  }

  clearCart(): void {
    this.http.delete(this.apiUrl).subscribe(() => {
      this.cartItems = [];
      this.cartSubject.next(this.cartItems);
    });
  }

  getCart(): Observable<CartItem[]> {
    return this.cartSubject.asObservable();
  }
}
