import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  constructor(public router: Router){}
  
  goToContacts(): void {
    this.router.navigate(['/contacts']);
  }

  goToProducts() : void {
    this.router.navigate(['/products']);
  }
}
