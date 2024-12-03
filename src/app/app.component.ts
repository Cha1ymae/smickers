import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { RouterOutlet } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { Product } from './product/product.types';
import { SeasonCarouselComponent } from "./season-carousel/season-carousel.component";
import { MyProductService } from './my-product.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    FooterComponent,
    HeaderComponent,
    ProductComponent,
    SeasonCarouselComponent
],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
 title = 'smickers';
 myProducts = new Array();
 constructor(private myProductService: MyProductService) {}
 
 ngOnInit(): void {
   this.myProducts = this.myProductService.getAllProduct();
 }
}
