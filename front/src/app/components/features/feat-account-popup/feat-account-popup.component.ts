import { Component } from '@angular/core';
import { AccountPopupService } from '../../../shared/services/account-popup.service';

@Component({
  selector: 'app-feat-account-popup',
  templateUrl: './feat-account-popup.component.html',
  styleUrls: ['./feat-account-popup.component.scss']
})
export class FeatAccountPopupComponent {

 
  isAccountPopupOpen: boolean = false;
  isSignUpFormOpen: boolean = false;
  isRegisterFormOpen: boolean = false;


  constructor(public accountPopupService: AccountPopupService) { }


  onCancelPopupAccount() {
    this.accountPopupService.closePopup();
  }

  onOpenSignUpForm() {
     this.isSignUpFormOpen = true;
  }

  onOpenRegisterForm() {
     this.isRegisterFormOpen = true;
  }

onRecevedMethodForCloseSignUpForm(isSignUpFormOpen: boolean) {
  this.isSignUpFormOpen = isSignUpFormOpen;
}

onRecevedMethodForCloseRegisterForm(isRegisterFormOpen: boolean) {
  this.isRegisterFormOpen = isRegisterFormOpen;
}


}
