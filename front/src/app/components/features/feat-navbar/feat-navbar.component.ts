import { Component } from '@angular/core';
import { TokenService } from 'src/app/shared/services/token.service';

@Component({
  selector: 'app-feat-navbar',
  templateUrl: './feat-navbar.component.html',
  styleUrls: ['./feat-navbar.component.scss']
})
export class FeatNavbarComponent {


  constructor(private tokenService: TokenService) {}


  isAccountPopupOpen: boolean = false;
  isFormCreateCard: boolean = false;


  
  
  OpenAccountPopup() {
    this.isAccountPopupOpen = !this.isAccountPopupOpen;
  }
  
  
  checkToken(): boolean {
    return this.tokenService.checkToken();
  }
  createCard() {
    if (this.checkToken()) {
      this.isFormCreateCard = !this.isFormCreateCard
      this.isAccountPopupOpen = false;
    } else {
      this.isAccountPopupOpen = !this.isAccountPopupOpen;
    }
  }

  toggleCardCreateForm(value: boolean) {
    this.isFormCreateCard = value;
  }

}
