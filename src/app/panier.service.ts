import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface CartItem {
  id: string;
  title: string;
  photo: string;
  price: number;
  size?: string;
  quantity: number;
}

@Injectable({
  providedIn: 'root',
})
export class PanierService {
  private cart: CartItem[] = [];
  private cartSubject: BehaviorSubject<CartItem[]> = new BehaviorSubject<CartItem[]>([]);

  constructor() {
    this.loadCartFromLocalStorage();
  }

  private saveCartToLocalStorage(): void {
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  private loadCartFromLocalStorage(): void {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      this.cart = JSON.parse(savedCart);
      this.cartSubject.next(this.cart);
    }
  }

  fetchCart(): void {
    this.cartSubject.next(this.cart);
  }

  getCart(): Observable<CartItem[]> {
    return this.cartSubject.asObservable();
  }

  addToCart(item: CartItem): void {
    const existingItem = this.cart.find(
      (cartItem) => cartItem.id === item.id && cartItem.size === item.size
    );

    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      this.cart.push(item);
    }

    this.saveCartToLocalStorage();
    this.cartSubject.next(this.cart);
  }

  updateQuantity(id: string, size: string, quantity: number): void {
    const item = this.cart.find((cartItem) => cartItem.id === id && cartItem.size === size);
    if (item) {
      item.quantity = quantity;
      this.saveCartToLocalStorage();
      this.cartSubject.next(this.cart);
    }
  }

  removeItem(id: string, size: string): void {
    this.cart = this.cart.filter((cartItem) => !(cartItem.id === id && cartItem.size === size));
    this.saveCartToLocalStorage();
    this.cartSubject.next(this.cart);
  }

  clearCart(): void {
    this.cart = [];
    this.saveCartToLocalStorage();
    this.cartSubject.next(this.cart);
  }
}
