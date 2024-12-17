import { Routes } from '@angular/router';
import { SneakersComponent } from './sneakers/sneakers.component';
import { CategoryComponent } from './category/category.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { PanierComponent } from './panier/panier.component';

export const routes: Routes = [
  { path: '', component: SneakersComponent },
  { path: 'category/:category', component: CategoryComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'confirmation', component: ConfirmationComponent },
  { path: 'panier', component: PanierComponent },
];
