import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MyProductService } from './my-product.service';
import { Router } from '@angular/router';

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

  constructor(private productService: MyProductService,    private router: Router,     ) {
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

  checkStockAndGoToCheckout(): void {
    this.productService.getAllProducts().subscribe((productsData) => {
      const products = productsData.data;
        let stockAvailable = true;
      
      for (let cartItem of this.cart) {
        const product = products.find((p) => p.id === cartItem.id);

        if (product && cartItem.quantity > product.stock) {
         stockAvailable = false;
          alert(`La quantité demandée pour le produit "${product.title}" dépasse le stock disponible.`);
          break; 
        }
      }

      if (stockAvailable) {
        this.cart.forEach((cartItem) => {
          const product = products.find((p) => p.id === cartItem.id);
          console.log(`Stock du produit "${product?.title}":"${product?.stock}"`);
          if (product) {
            product.stock -= cartItem.quantity;
  
            this.productService.updateProductStock(product.id, product.stock).subscribe({
              next: () => {
                console.log(`Stock du produit "${product.title}":"${product.stock}"`);
              },
              error: (err) => {
                console.error('Erreur lors de la mise à jour du stock :', err);
              },
            });
          }
        });
        this.clearCart();
        this.saveCartToLocalStorage();
        this.cartSubject.next(this.cart);
        alert('Commande validée, les stocks ont été mis à jour.');
        this.router.navigate(['/checkout']);
      }
    });
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
