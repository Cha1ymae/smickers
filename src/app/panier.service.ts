import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface CartItem {
  id: string;
  title: string;
  photo: string;
  price: number;
  quantity: number;
  size?: string; 
}

@Injectable({
  providedIn: 'root',
})
export class PanierService {
  private cart: CartItem[] = [];
  private cartSubject = new BehaviorSubject<CartItem[]>(this.cart);

  constructor() {}

  getCart(): Observable<CartItem[]> {
    return this.cartSubject.asObservable();
  }

  fetchCart(): void {
    this.cartSubject.next(this.cart);
  }

  addToCart(item: CartItem): void {
    const existingItem = this.cart.find(
      (cartItem) => cartItem.id === item.id && cartItem.size === item.size
    );

    if (existingItem) {
      existingItem.quantity += item.quantity || 1;
    } else {
      this.cart.push({ ...item, quantity: item.quantity || 1 });
    }

    this.cartSubject.next([...this.cart]);
  }

  updateQuantity(id: string, size: string, quantity: number): void {
    const item = this.cart.find(
      (cartItem) => cartItem.id === id && cartItem.size === size
    );

    if (item) {
      item.quantity = quantity;
      this.cartSubject.next([...this.cart]);
    }
  }

  removeItem(id: string, size: string): void {
    this.cart = this.cart.filter(
      (cartItem) => !(cartItem.id === id && cartItem.size === size)
    );
    this.cartSubject.next([...this.cart]);
  }

  clearCart(): void {
    this.cart = [];
    this.cartSubject.next([...this.cart]);
  }
}
