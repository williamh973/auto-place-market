import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Favorite } from 'src/app/models/favorite.model';
import { Card } from 'src/app/models/card.model';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  private readonly _BASE_URL = 'http://localhost:8080/api/v1/favorites';

  constructor(private http: HttpClient) {}

  getCurrentUserFavoriteList(): Observable<Favorite[]> {
    return this.http.get<Favorite[]>(`${this._BASE_URL}/currentUser/all`);
  }

  addCardInFavoriteList(cardId: number): Observable<Card> {
    return this.http.post<Card>(`${this._BASE_URL}/add/${cardId}`, {});
  }

  deleteFavorite(favorite: Favorite): Observable<void> {
    const favoriteId = favorite.id;
    return this.http.delete<void>(`${this._BASE_URL}/delete/${favoriteId}`);
  }
}
