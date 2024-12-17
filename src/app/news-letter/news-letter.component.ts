import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-news-letter',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './news-letter.component.html',
  styleUrls: ['./news-letter.component.css'],
})
export class NewsLetterComponent {
  @ViewChild('newsForm') userForm!: NgForm;
  email: string = '';
  showCoupon: boolean = false;
  couponCode: string = 'Hugomid';

  submitForm(newsFormValue: { email: string }) {
    if (newsFormValue.email) {
      this.showCoupon = true;
    }
  }
}
