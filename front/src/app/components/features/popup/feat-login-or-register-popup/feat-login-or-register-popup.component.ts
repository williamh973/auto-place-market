import { Component } from '@angular/core';
import { loginOrRegisterPopupService } from '../../../../shared/services/account-popup.service';

@Component({
  selector: 'app-feat-login-or-register-popup',
  templateUrl: './feat-login-or-register-popup.component.html',
  styleUrls: ['./feat-login-or-register-popup.component.scss'],
})
export class FeatLoginOrRegisterPopupComponent {
  isLoginOrRegisterPopupOpen: boolean = false;
  isSignInFormOpen: boolean = false;
  isRegisterFormOpen: boolean = false;

  constructor(
    public loginOrRegisterPopupService: loginOrRegisterPopupService
  ) {}

  onCancelPopupAccount() {
    this.loginOrRegisterPopupService.closePopup();
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
