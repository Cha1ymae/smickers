import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { ProductComponent } from './product/product.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { SeasonCarouselComponent } from "./season-carousel/season-carousel.component";
import { MyProductService } from './my-product.service';
import { NewsLetterComponent } from "./news-letter/news-letter.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FooterComponent,
    HeaderComponent,
    ProductComponent,
    SeasonCarouselComponent,
    NewsLetterComponent
],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
 title = 'smickers';
 protected myProducts = new Array();
 selectedCategory: string = '';
 constructor(private myProductService : MyProductService) {}
 
 ngOnInit(): void {
  this.myProductService
  .getProducts().subscribe((response) => this.myProducts = response.data);
}

 onSeasonChanged(season: string) {
  this.selectedCategory = season;
}

scrollToProducts(): void {
  const productSection = document.getElementById('product-section');
  if (productSection) {
    productSection.scrollIntoView({ behavior: 'smooth' });
  }
}
}
