import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-feat-account-popup',
  templateUrl: './feat-account-popup.component.html',
  styleUrls: ['./feat-account-popup.component.scss']
})
export class FeatAccountPopupComponent {

  @Output() isAccountPopupOpenEmit: EventEmitter<boolean> = new EventEmitter<boolean>();
 
  isAccountPopupOpen: boolean = false;
  isSignUpFormOpen: boolean = false;
  isRegisterFormOpen: boolean = false;

  onCancelPopupAccount() {
    this.isAccountPopupOpenEmit.emit(this.isAccountPopupOpen);
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
