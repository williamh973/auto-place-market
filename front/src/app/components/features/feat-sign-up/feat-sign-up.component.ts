import { Component } from '@angular/core';
import { UserAuth } from 'src/app/models/user-auth.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';

@Component({
  selector: 'app-feat-sign-up',
  templateUrl: './feat-sign-up.component.html',
  styleUrls: ['./feat-sign-up.component.scss']
})
export class FeatSignUpComponent {

  userAuth: UserAuth = new UserAuth("", "");

  constructor(
    private httpS: AuthService,
    private LsService: LocalStorageService) { }
  
  onSubmitAuth(): void {
    this.LsService.clearToken();
    this.httpS.signIn(this.userAuth);
  } 
}
