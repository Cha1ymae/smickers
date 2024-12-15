import { Routes } from '@angular/router';
import { SneakersComponent } from './sneakers/sneakers.component';
import { CategoryComponent } from './category/category.component';
import { PanierComponent } from './panier/panier.component';

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

];
