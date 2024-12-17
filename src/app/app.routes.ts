import { Routes } from '@angular/router';
import { SneakersComponent } from './sneakers/sneakers.component';
import { CategoryComponent } from './category/category.component';
import { PanierComponent } from './panier/panier.component';
import { ContactsComponent } from './contacts/contacts.component';
import { OnlyProductsComponent } from './only-products/only-products.component';

export const routes: Routes = [
  {
    path: '',
    component: SneakersComponent,
  },
  {
    path: 'category/:category', 
    component: CategoryComponent,
  },
  {
     path: 'panier',
   component: PanierComponent 
  },
  { 
    path: 'contacts',
     component: ContactsComponent 
  },
  { 
    path: 'products',
     component: OnlyProductsComponent 
  },

];
