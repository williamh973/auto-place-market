import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class TokenValidityService {


  private readonly _BASE_URL_TOKEN: string = "http://localhost:8080/token";


  constructor(private http: HttpClient) { }


  //  private onLogout(): void {
  //     this.lsService.clearTokenAndUserEmail();
  //     this.tokenS.resetToken();
  //   }


  getTokenValidity(): Observable<boolean> {
    return this.http.get<boolean>(`${this._BASE_URL_TOKEN}/check-token-validity`)
  }

}