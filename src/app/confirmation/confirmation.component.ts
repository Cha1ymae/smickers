import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-confirmation',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css'],
})
export class ConfirmationComponent {
  orderData: any;

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.orderData = navigation?.extras.state?.['data']; 
  }
}
