import { Component, EventEmitter, Output } from '@angular/core';
import { UserAuth } from 'src/app/models/user-auth.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';

@Component({
  selector: 'app-feat-sign-in-form',
  templateUrl: './feat-sign-in-form.component.html',
  styleUrls: ['./feat-sign-in-form.component.scss']
})
export class FeatSignInFormComponent {
  
  @Output() onSignUpFormOpenEmit: EventEmitter<boolean> = new EventEmitter<boolean>();
  
  isSignUpFormOpen: boolean = false;
  isRegisterFormOpen: boolean = false;

  userAuth: UserAuth = new UserAuth("", "");  



  constructor(
    private httpS: AuthService,
    private LsService: LocalStorageService
    ) { }



  onCancelSignUpForm() {
  this.onSignUpFormOpenEmit.emit(this.isSignUpFormOpen);
  }

  onOpenRegisterForm() {
    this.isRegisterFormOpen = true;
  }
    
  
  onSubmitAuth(): void {
    this.LsService.clearToken();
    this.httpS.signIn(this.userAuth);
    this.isSignUpFormOpen = false;
  } 


  onRecevedMethodForCloseRegisterForm(isRegisterFormOpen: boolean) {
    this.isRegisterFormOpen = isRegisterFormOpen;
  }


}