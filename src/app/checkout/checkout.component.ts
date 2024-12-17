import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [FormsModule, CommonModule], 
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class CheckoutComponent {
  orderData = {
    fullName: '',
    email: '',
    address: '',
    delivery: 'standard',
    payment: 'card',
  };

  constructor(private router: Router) {}

  onSubmit(): void {
    console.log('Commande confirmée :', this.orderData);
    this.router.navigate(['/confirmation'], { state: { data: this.orderData } });
  }
}
