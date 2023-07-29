import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';



@Injectable({
  providedIn: 'root'
})
export class FavoriteStatusService {


      constructor(
       private localStorageService: LocalStorageService
  ) {}


  
  getFavoriteStatus(cardId: number): boolean {
    const tokenInLocalStorage = this.localStorageService.getToken();
    if (!tokenInLocalStorage) {
      return false;
    }
     const favoriteCards = this.getFavoriteCards();
     return favoriteCards.includes(cardId);
  }

  setFavoriteStatus(cardId: number, isFavorite: boolean): void {
    let favoriteCards = this.getFavoriteCards();
    if (isFavorite) {
     
      if (!favoriteCards.includes(cardId)) {
        favoriteCards.push(cardId);
      }
    } else {
      
      favoriteCards = favoriteCards.filter(id => id !== cardId);
    }
    
      localStorage.setItem("favoriteCards", JSON.stringify(favoriteCards));
    
  }

  private getFavoriteCards(): number[] {
    const favoriteCardsStr = localStorage.getItem("favoriteCards");
    return favoriteCardsStr ? JSON.parse(favoriteCardsStr) : [];
  }

}