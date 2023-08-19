import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { BehaviorSubject, Observable, Subject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class FavoriteStatusService {


  private readonly FAVORITE_KEY_PREFIX = 'favorites_';

  private favoriteCardsSubject$: Subject<number[]> = new Subject<number[]>();


  constructor(private localStorageService: LocalStorageService) {}


  public getUserFavoriteKey(userEmail: string): string {
    return `${this.FAVORITE_KEY_PREFIX}${userEmail}`;
  }
  public getFavoriteCards(favoriteKey: string): number[] {
    const favoriteCardsStr = localStorage.getItem(favoriteKey);
    return favoriteCardsStr ? JSON.parse(favoriteCardsStr) : [];
  }
  public saveFavoriteCards(favoriteKey: string, favoriteCards: number[]): void {
    localStorage.setItem(favoriteKey, JSON.stringify(favoriteCards));
    this.favoriteCardsSubject$.next(favoriteCards);
  }


  getFavoriteStatus(cardId: number): boolean {
    const userEmailInLocalStorage = this.localStorageService.getUserEmail();
    if (!userEmailInLocalStorage) {
      return false;
    }

    const userFavoritesKey = this.getUserFavoriteKey(userEmailInLocalStorage);
    const favoriteCards = this.getFavoriteCards(userFavoritesKey);
    const isFavorite = favoriteCards.includes(cardId);
    return isFavorite;
  }

  setFavoriteStatus(cardId: number, isFavorite: boolean) {
    const userEmailInLocalStorage = this.localStorageService.getUserEmail();
    if (userEmailInLocalStorage) {
      const userFavoritesKey = this.getUserFavoriteKey(userEmailInLocalStorage);
  let favoriteCards: number[] = [];

  const existingFavoriteCards = this.getFavoriteCards(userFavoritesKey);
  if (existingFavoriteCards) {
    favoriteCards = [...existingFavoriteCards]; 
  }

  const index = favoriteCards.indexOf(cardId);

  if (isFavorite) {
    if (index === -1) {
      favoriteCards.push(cardId);
    }
  } else {
    if (index !== -1) {
      favoriteCards.splice(index, 1);
    }
  }

   this.saveFavoriteCards(userFavoritesKey, favoriteCards);
   localStorage.setItem(userFavoritesKey, JSON.stringify(favoriteCards));
  //  localStorage.removeItem(userFavoritesKey);

   console.log(`${userFavoritesKey} : ${favoriteCards}`);
   }
  }

  getFavoriteCardsSubject$(): Observable<number[]> {
    return this.favoriteCardsSubject$.asObservable();
  }

}