import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserAuth } from 'src/app/models/user-auth.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { TokenService } from 'src/app/shared/services/token.service';
import { TokenResponse } from '../../../models/token.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-feat-sign-in-form',
  templateUrl: './feat-sign-in-form.component.html',
  styleUrls: ['./feat-sign-in-form.component.scss']
})
export class FeatSignInFormComponent {
  
  @Output() onSignInFormOpenEmit: EventEmitter<boolean> = new EventEmitter<boolean>();
  
  isSignInFormOpen: boolean = false;
  isRegisterFormOpen: boolean = false;

   userAuth: UserAuth = new UserAuth("", "");  


  constructor(
    private httpS: AuthService,
    private LsService: LocalStorageService,
    private tokenS: TokenService,
    private router: Router
    ) { }


  onCancelSignInForm() {
  this.onSignInFormOpenEmit.emit(this.isSignInFormOpen);
  }

  onOpenRegisterForm() {
    this.isRegisterFormOpen = true;
  }
    
  onSubmitAuth(): void {
    this.LsService.clearToken();
    this.httpS.signIn(this.userAuth);
    localStorage.setItem('userEmail', this.userAuth.email)
      
   setTimeout(() => {
     window.location.reload() 
   }, 500);
  } 


  onRecevedMethodForCloseRegisterForm(isRegisterFormOpen: boolean) {
    this.isRegisterFormOpen = isRegisterFormOpen;
  }

}
