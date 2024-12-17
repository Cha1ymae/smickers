import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, firstValueFrom } from 'rxjs';

export interface CartItem {
  id: string;
  title: string;
  price: number;
  size?: string;
  quantity?: number; 
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
    this.http.get<any>(this.apiUrl).subscribe(
      (response) => {
        if (response && response.products) {
          this.cartItems = response.products.map((product: any) => ({
            id: product.id,
            title: product.title,
            price: product.price,
            photo: product.photo,
          }));
          this.cartSubject.next(this.cartItems);
          console.log('Panier récupéré avec succès', this.cartItems);
        }
      },
      (error) => {
        console.error('Erreur lors de la récupération du panier', error);
      }
    );
  }

 
  addToCart(item: CartItem): void {
    if (!item || !item.id) {
      console.error('Produit invalide', item);
      return;
    }
  
    const productPayload = {
      products: [{ id: item.id }],
    };
  
    this.http.patch<any>(this.apiUrl, productPayload).subscribe({
      next: (response) => {
        console.log('Produit ajouté au panier', response);
        this.fetchCart();
      },
      error: (error) => {
        console.error("Erreur lors de l'ajout au panier", error);
      },
    });
  }


  updateQuantity(itemId: string, size: string, quantity: number): void {
    const payload = { itemId, size, quantity };

    this.http.patch(this.apiUrl, payload).subscribe(
      () => {
        console.log('Quantité mise à jour');
        this.fetchCart();
      },
      (error) => {
        console.error('Erreur lors de la mise à jour de la quantité', error);
      }
    );
  }

  removeItem(itemId: string, size?: string): void {
    this.http
      .delete(`${this.apiUrl}/${itemId}`, { params: size ? { size } : {} })
      .subscribe(
        () => {
          console.log('Produit supprimé du panier');
          this.fetchCart();
        },
        (error) => {
          console.error('Erreur lors de la suppression du produit', error);
        }
      );
  }


  clearCart(): void {
    this.http.delete(this.apiUrl).subscribe(
      () => {
        this.cartItems = [];
        this.cartSubject.next(this.cartItems);
        console.log('Panier vidé avec succès');
      },
      (error) => {
        console.error('Erreur lors du vidage du panier', error);
      }
    );
  }

  getCart(): Observable<CartItem[]> {
    return this.cartSubject.asObservable();
  }
}
