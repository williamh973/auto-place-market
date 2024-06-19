import { Injectable } from '@angular/core';
import { TokenResponse } from '../../models/token.model';
import { UserAuth } from 'src/app/models/user-auth.model';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private readonly USER_EMAIL_KEY = 'userEmail';

  constructor() {}

  getToken(): string | null {
    const tokenId = localStorage.getItem('tokenId');
    if (tokenId) {
      return tokenId;
    } else {
      return null;
    }
  }
  setToken(tokenFromDB: TokenResponse): void {
    localStorage.setItem('tokenId', tokenFromDB.token);
  }

  clearTokenAndUserEmail(): void {
    localStorage.removeItem('tokenId');
    localStorage.removeItem(this.USER_EMAIL_KEY);
  }
}
