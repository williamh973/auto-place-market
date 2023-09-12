import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { UserAuth } from '../../models/user-auth.model';
import { TokenService } from './token.service';
import { TokenResponse } from '../../models/token.model';
import { UserRegister } from '../../models/user-register.model';
import { LocalStorageService } from './local-storage.service';
import { Router } from '@angular/router';


 
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly _BASE_URL = "http://localhost:8080/api/v1/auth";
  private _httpErrorSubject$: BehaviorSubject<HttpErrorResponse> = new BehaviorSubject(new HttpErrorResponse({}));
  private _httpSuccessSubject$: BehaviorSubject<HttpResponse<any>> = new BehaviorSubject(new HttpResponse({}));


  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
    private localStorageService: LocalStorageService,
    private router: Router,
  ) { }


  signUp(userRegister: UserRegister): void {
    this.http.post<any>(`${this._BASE_URL}/register`, userRegister)
    .pipe(tap(res => console.log(res)))
      .subscribe()
  }

  signIn(userAuth: UserAuth): void {
    this.tokenService.resetToken();
    this.http.post<any>(`${this._BASE_URL}/authenticate`, userAuth)
      .subscribe((tokenFromDB: TokenResponse) => {
        this.tokenService.updateToken(tokenFromDB);
        this.localStorageService.setUserEmail(userAuth);
      })
        setTimeout(() => {
          this.router.navigateByUrl("/user-space");        
        }, 2500);
        
  }


  getHttpErrorSubject$(): Observable<HttpErrorResponse> {
    return this._httpErrorSubject$.asObservable();
  }
  setHttpErrorSubject$(error: HttpErrorResponse): void {
    this._httpSuccessSubject$.next(new HttpResponse({}))
    this._httpErrorSubject$.next(error);
  }

  getHttpSuccessSubject$(): Observable<HttpResponse<any>> {
    return this._httpSuccessSubject$.asObservable();
  }
  setHttpSuccessSubject$(success: HttpResponse<any>): void {
    this._httpErrorSubject$.next(new HttpErrorResponse({}))
    this._httpSuccessSubject$.next(success);
  }


}
