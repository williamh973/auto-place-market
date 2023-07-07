import { Component } from '@angular/core';
import { AccountPopupService } from 'src/app/shared/services/account-popup.service';
import { TokenService } from 'src/app/shared/services/token.service';

@Component({
  selector: 'app-feat-navbar',
  templateUrl: './feat-navbar.component.html',
  styleUrls: ['./feat-navbar.component.scss']
})
export class FeatNavbarComponent {


  constructor(
    private tokenService: TokenService,
    public accountPopupService: AccountPopupService
    ) {}


  isAccountPopupOpen: boolean = false;
  isFormCreateCard: boolean = false;



  
  checkToken(): boolean {
    return this.tokenService.checkToken();
  }

  createCard() {
    if (this.checkToken()) {
      this.isFormCreateCard = !this.isFormCreateCard
      this.accountPopupService.closePopup();
    } else {
      this.accountPopupService.openPopup();
    }
  }
 
  toggleCardCreateForm(value: boolean) {
    this.isFormCreateCard = value;
  }

}
