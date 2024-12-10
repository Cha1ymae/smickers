import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-news-letter',
  imports:[FormsModule,CommonModule],
  templateUrl: './news-letter.component.html',
  styleUrls: ['./news-letter.component.css'],
})
export class NewsLetterComponent {
  @ViewChild('newsForm') userForm!: NgForm;

  submitForm(newsFormValue: { email: string }) {
    console.log('Email entered:', newsFormValue.email);
  }
}
