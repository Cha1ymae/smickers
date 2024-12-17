import { Component, OnInit } from '@angular/core';
import { PanierService, CartItem } from '../panier.service';
import { Router } from '@angular/router';
import { NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-panier',
  standalone: true,
  imports: [NgIf, NgFor, FormsModule, MatIconModule],
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css'],
})
export class PanierComponent implements OnInit {
  cartItems: CartItem[] = [];
  total: number = 0;
  coupon: string = '';
  discount: number = 0;

  constructor(private panierService: PanierService, private router: Router) {}

  ngOnInit(): void {
    this.panierService.getCart().subscribe((items) => {
      this.cartItems = items;
      this.calculateTotal();
    });
    this.panierService.fetchCart();
  }

  updateQuantity(item: CartItem): void {
    if (item.quantity > 0) {
      this.panierService.updateQuantity(item.id, item.size || '', item.quantity);
      this.calculateTotal();
    }
  }

  removeItem(item: CartItem): void {
    this.panierService.removeItem(item.id, item.size || '');
    this.calculateTotal();
  }

  clearCart(): void {
    this.panierService.clearCart();
    this.cartItems = [];
    this.total = 0;
  }

  applyCoupon(): void {
    if (this.coupon === 'Hugomid') {
      this.discount = this.total * 0.1;
    } else {
      alert('Code coupon invalide.');
      this.discount = 0;
    }
    this.calculateTotal();
  }

  calculateTotal(): void {
    const subtotal = this.cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    this.total = subtotal - this.discount;
  }

  goToCheckout(): void {
    this.panierService.checkStockAndGoToCheckout(); 
    { state: { total: this.total } }
  }
}
