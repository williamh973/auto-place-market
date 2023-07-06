import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap, tap } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { Card } from 'src/app/models/card.model';


@Injectable({
  providedIn: 'root'
})
export class CardService {

  
  cardList: Card[] = [];
  
  filteredCardListSubject$: BehaviorSubject<Card[]> = new BehaviorSubject<Card[]>([]);

  private readonly _BASE_URL_CARD: string = "http://localhost:8080/cards";
 


  constructor(private http: HttpClient) { }


  getCardList(): Observable<Card[]> {
    return this.http.get<Card[]>(this._BASE_URL_CARD);
  }

  getCardById(id: number): Observable<Card> {
    const url = `${this._BASE_URL_CARD}/${id}`;
    return this.http.get<Card>(url);
  }

  createCard(card: Card): Observable<Card> {
    return this.http.post<Card>(`${this._BASE_URL_CARD}/add`, card);
  }

  updateCard(card: Card): Observable<Card> {
    return this.http.put<Card>(`${this._BASE_URL_CARD}/update/${card.id}`, card);
  }

  deleteCard(cardId: number): Observable<void> {
    return this.http.delete<void>(`${this._BASE_URL_CARD}/delete/${cardId}`);
  }





  // getCardList(): Observable<Card[]> {
  //   return this.http.get<Card[]>(`${this._BASE_URL_CARD}/all`)
  //     .pipe(
  //       tap((cards: Card[]) => this.filteredCardListSubject$.next(cards)),
  //       switchMap(() => this.filteredCardListSubject$.asObservable())
  //     )
  // }

  // getCardList(): Observable<Card[]> {
  //   return this.http.get<Card[]>(this._BASE_URL_CARD);
  // }

  // createCard(card: Card): Observable<Card> {
  //   return this.http.post<Card>(`${this._BASE_URL_CARD}/add`, card);
  // }

  // update(card: Card): Observable<Card> {
  //   return this.http.put<Card>(`${this._BASE_URL_CARD}/update/${card.id}`, card);
  // }

  // delete(cardId: number): Observable<void> {
  //   return this.http.delete<void>(`${this._BASE_URL_CARD}/delete/${cardId}`);
  // }











  postFilterCardList(filteredCardList: Card[],) {
    this.filteredCardListSubject$.next([...filteredCardList]);
  }
  
  getFilteredCardList$(): Observable<Card[]> {
    return this.filteredCardListSubject$.asObservable();
  }
  

}
