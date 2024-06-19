import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, map } from 'rxjs';
import { TokenService } from '../shared/services/token.service';
import { loginOrRegisterPopupService } from '../shared/services/account-popup.service';

@Injectable({
  providedIn: 'root',
})
export class UserGuard implements CanActivate {
  role!: 'ROLE_USER' | 'ROLE_ADMIN';

  constructor(
    private router: Router,
    private tokenS: TokenService,
    public loginOrRegisterPopupService: loginOrRegisterPopupService
  ) {
    // Lorsque se construit ma classe (1 seule fois), je récupère mon JWT (opération asynchrone donc je dois la lancer le plus tôt possible)
    // Ma méthode canActivate() se déclenchera plus tard
    this.tokenS
      ._getTokenDetailsSubject$()
      .pipe(map((decodedToken: any) => decodedToken.role))
      .subscribe((role: 'ROLE_USER' | 'ROLE_ADMIN') => {
        this.role = role;
      });
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.role === 'ROLE_USER') {
      return true;
    } else {
      this.loginOrRegisterPopupService.openPopup();
      this.router.navigate(['']);
      return false;
    }
  }
}
