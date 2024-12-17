import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent {
  total = 0;
  deliveryFee = 0;
  discount = 0;

  couponCode = '';
  validCoupon = 'Hugomid';

  orderData = {
    fullName: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    delivery: 'Standard',
    payment: 'Carte Bancaire',
  };

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.total = navigation?.extras.state?.['total'] || 0;
  }

  onDeliveryChange(): void {
    this.deliveryFee = this.orderData.delivery === 'Express' ? 28.9 : 0;
  }

  isFrenchPostalCode(postalCode: string): boolean {
    const frenchPostalCodeRegex = /^[0-9]{5}$/;
    return frenchPostalCodeRegex.test(postalCode);
  }

  isCityValid(): boolean {
    const validCities = ['Paris', 'Lyon', 'Marseille', 'Toulouse', 'Bordeaux', 'Nantes', 'Lille', 'Strasbourg', 'Nice', 'Montpellier', 'Nancy', 'Roubaix', 'Tourcoing', 'Valenciennes', 'Angers' ];
    return validCities.includes(this.orderData.city);
  }

  isFormValid(): boolean {
    const { fullName, email, address, city, postalCode, delivery, payment } = this.orderData;
    return (
      !!(fullName && email && address && city && postalCode && delivery && payment) &&
      this.isFrenchPostalCode(postalCode) &&
      this.isCityValid()
    );
  }

  applyCoupon(): void {
    if (this.couponCode === this.validCoupon) {
      this.discount = 0.1 * this.total;
    } else {
      this.discount = 0;
      alert('Le code coupon est invalide.');
    }
  }

  calculateTotal(): number {
    return this.total - this.discount + this.deliveryFee;
  }

  onSubmit(): void {
    if (this.isFormValid()) {
      this.router.navigate(['/confirmation'], {
        state: { data: { ...this.orderData, total: this.calculateTotal(), discount: this.discount } },
      });
    } else {
      alert('Veuillez entrer un code postal français valide et une ville en France.');
    }
  }
}
