import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { NgIf, NgFor } from '@angular/common';
import { CartItem, PanierService } from '../panier.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-panier',
  standalone: true,
  imports: [FormsModule, NgIf, NgFor, MatIconModule], 
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css'],
})
export class PanierComponent implements OnInit {
  cartItems: CartItem[] = [];

  constructor(private panierService: PanierService, private router: Router) {}

  goToCheckout(): void {
    const total = this.getTotal();
    this.router.navigate(['/checkout'], { state: { total } });
  }

  ngOnInit(): void {
    this.panierService.getCart().subscribe((items) => {
      this.cartItems = items.map((item) => ({
        ...item,
        quantity: item.quantity || 1,
      }));
    });
    this.panierService.fetchCart();
  }

  updateQuantity(item: CartItem): void {
    if (item.quantity && item.quantity > 0) {
      this.panierService.updateQuantity(item.id, item.size || '', item.quantity);
    } else {
      item.quantity = 1;
    }
  }

  removeItem(item: CartItem): void {
    this.panierService.removeItem(item.id, item.size || '');
  }

  clearCart(): void {
    this.panierService.clearCart();
  }

  getTotal(): number {
    return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }
}
