import { Component, EventEmitter, Output } from '@angular/core';
import { UserAuth } from 'src/app/models/user-auth.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';

@Component({
  selector: 'app-feat-sign-in-form',
  templateUrl: './feat-sign-in-form.component.html',
  styleUrls: ['./feat-sign-in-form.component.scss'],
})
export class FeatSignInFormComponent {
  @Output() onSignInFormOpenEmit: EventEmitter<boolean> =
    new EventEmitter<boolean>();

  isSignInFormOpen: boolean = false;
  isAnimationPopupSignInStatusActive: boolean = false;
  isSubmitButtonEnabled: boolean = false;
  userAuth: UserAuth = new UserAuth('', '');

  constructor(
    private httpS: AuthService,
    private LsService: LocalStorageService
  ) {}

  onCancelSignInForm() {
    this.onSignInFormOpenEmit.emit(this.isSignInFormOpen);
  }

  onSubmitAuth(): void {
    this.LsService.clearTokenAndUserEmail();
    this.httpS.signIn(this.userAuth);
    this.isAnimationPopupSignInStatusActive = true;
  }
}
