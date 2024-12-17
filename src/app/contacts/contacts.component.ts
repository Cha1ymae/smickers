import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contacts',
  imports: [FormsModule,NgIf],
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent {
  name: string = '';
  email: string = '';
  message: string = '';
  isFormSubmitted: boolean = false;

  onSubmit(contactForm: any) {
    if (contactForm.invalid) {
      return;
    }
    
    console.log('Formulaire soumis');
    this.isFormSubmitted = true;
  }
}
