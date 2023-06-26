import { Component } from '@angular/core';

@Component({
  selector: 'app-feat-navbar',
  templateUrl: './feat-navbar.component.html',
  styleUrls: ['./feat-navbar.component.scss']
})
export class FeatNavbarComponent {

  isAccountPopupOpen: boolean = false;
  isFormCreateCard: boolean = false;


  OpenAccountPopup() {
    this.isAccountPopupOpen = !this.isAccountPopupOpen;
  }
  
  createCard() {
    this.isFormCreateCard = !this.isFormCreateCard
  }

  toggleCardCreateForm(value: boolean) {
    this.isFormCreateCard = value;
  }

}
