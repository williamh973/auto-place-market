import { Injectable } from '@angular/core';
import { TokenResponse } from '../../models/token.model';
import { UserAuth } from 'src/app/models/user-auth.model';
import { User } from 'src/app/models/user.model';


@Injectable({
  providedIn: 'root'
})
export class LocalStorageService { 
 

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

  clearToken(): void {
    localStorage.removeItem("tokenId")
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

  
  getUserEmail(): void {
    localStorage.getItem('userEmail');
  }
  setUserEmail(userAuth: UserAuth): void {
    localStorage.setItem('userEmail', userAuth.email);
  }

  
}
