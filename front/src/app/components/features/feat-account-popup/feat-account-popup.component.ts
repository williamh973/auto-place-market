import { Component } from '@angular/core';
import { AccountPopupService } from '../../../shared/services/account-popup.service';

@Component({
  selector: 'app-feat-account-popup',
  templateUrl: './feat-account-popup.component.html',
  styleUrls: ['./feat-account-popup.component.scss']
})
export class FeatAccountPopupComponent {

 
  isAccountPopupOpen: boolean = false;
  isSignInFormOpen: boolean = false;
  isRegisterFormOpen: boolean = false;


  constructor(public accountPopupService: AccountPopupService) { }


  onCancelPopupAccount() {
    this.accountPopupService.closePopup();
  }

  onOpenSignInForm() {
     this.isSignInFormOpen = true;
  }
 
  onOpenRegisterForm() {
     this.isRegisterFormOpen = true;
  }

onRecevedMethodForCloseSignInForm(isSignInFormOpen: boolean) {
  this.isSignInFormOpen = isSignInFormOpen;
}

onRecevedMethodForCloseRegisterForm(isRegisterFormOpen: boolean) {
  this.isRegisterFormOpen = isRegisterFormOpen;
}


}
