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
  isEditCardFormOpen: boolean = false;
 
  delaySecondsForAnimationSearchBar: number = 2;

  
  checkToken(): boolean {
    return this.tokenService.checkToken();
  }

  onEditCardFormOpen() {
    if (this.checkToken()) {
      this.isEditCardFormOpen = !this.isEditCardFormOpen;
      this.accountPopupService.closePopup();
    } else {
      this.accountPopupService.openPopup();
    }
  }

  onRecevedMethodForCloseEditCardForm(isEditCardFormOpen: boolean) {
    this.isEditCardFormOpen = isEditCardFormOpen;
  }

}
