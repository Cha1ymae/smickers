import { Component, Input } from '@angular/core';
import { MyProductService } from '../my-product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sneakers',
  imports: [],
  template: `
  <div>
  <h1>Produits pour la catégorie : {{ selectedCategory }}</h1>
</div>
`,
  styleUrl: './sneakers.component.css'
})
export class SneakersComponent {
  @Input() selectedCategory: string = '';
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.selectedCategory = params['category'] || 'été'; 
      console.log(`Catégorie initialisée dans SneakersComponent : ${this.selectedCategory}`);
    });
  }
}
