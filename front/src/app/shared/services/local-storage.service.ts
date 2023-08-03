import { Injectable } from '@angular/core';
import { TokenResponse } from '../../models/token.model';
import { UserAuth } from 'src/app/models/user-auth.model';


@Injectable({
  providedIn: 'root'
})
export class LocalStorageService { 
 

  private readonly USER_EMAIL_KEY = 'userEmail';


  constructor() { }


  getToken(): string | null {
    const tokenId = localStorage.getItem("tokenId");
    if (tokenId) {
      return tokenId;
    } else {
      return null;
    }
  }
  setToken(tokenFromDB: TokenResponse): void {
    localStorage.setItem("tokenId", tokenFromDB.token);
  }

  clearTokenAndUserEmail(): void {
    localStorage.removeItem('tokenId');
    localStorage.removeItem(this.USER_EMAIL_KEY);
  }


  getUserId(): number | null {
    const userId = localStorage.getItem('userId');
    return userId ? parseInt(userId, 10) : null;
  }
  setUserId(userId: number): void {
    if (userId) {
      localStorage.setItem('userId', userId.toString());
    }
  }

  getUserEmail(): string | null {
   return localStorage.getItem(this.USER_EMAIL_KEY);
  }
  setUserEmail(userAuth: UserAuth): void {
    localStorage.setItem(this.USER_EMAIL_KEY, userAuth.email);
  }

  
}
