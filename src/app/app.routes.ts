import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SeasonCarouselComponent } from './season-carousel/season-carousel.component';
import { SneakersComponent } from './sneakers/sneakers.component';

export const routes: Routes = [
  { path: '', redirectTo: '/season-carousel', pathMatch: 'full' },
  
  { path: 'season-carousel', component: SeasonCarouselComponent },

  { path: 'sneakers', component: SneakersComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
