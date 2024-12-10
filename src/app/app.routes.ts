// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { SneakersComponent } from './sneakers/sneakers.component';
import { CategoryComponent } from './category/category.component';

export const routes: Routes = [
  {
    path: '',
    component: SneakersComponent,
  },
  {
    path: 'category/:category', 
    component: CategoryComponent,
  },
];
