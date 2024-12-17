import { Component, OnInit } from '@angular/core';
import { CartItem, PanierService } from '../panier.service';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-panier',
  imports:[FormsModule,NgIf,NgFor],
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css'],
})
export class PanierComponent implements OnInit {
  cartItems: CartItem[] = [];

  constructor(private panierService: PanierService) {}

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
      console.warn('La quantité doit être supérieure à 0');
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
    return this.cartItems.reduce(
      (total, item) => total + item.price * (item.quantity || 1),
      0
    );
  }
}
