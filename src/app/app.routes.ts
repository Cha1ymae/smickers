import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { SneakersComponent } from './sneakers/sneakers.component';

export const routes: Routes = [
  {
    path :'',
    component: SneakersComponent
  },
];

@NgModule({
  imports: [],
  exports: []
})
export class AppRoutingModule { }
