import { Component, OnInit } from '@angular/core';
import { PanierService, CartItem } from '../panier.service';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-panier',
  imports:[FormsModule,NgIf,NgFor],
  templateUrl: './panier.component.html',
})
export class PanierComponent implements OnInit {
  cartItems: CartItem[] = [];

  constructor(private panierService: PanierService) {}

  ngOnInit(): void {
    this.panierService.fetchCart(); 
    this.panierService.getCart().subscribe((items) => {
      this.cartItems = items;
    });
  }

  updateQuantity(item: CartItem) {
    this.panierService.updateQuantity(item.id, item.size, item.quantity);
  }

  removeItem(item: CartItem) {
    this.panierService.removeItem(item.id, item.size);
  }

  clearCart() {
    this.panierService.clearCart();
  }

  getTotal(): number {
    return this.cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }
}
