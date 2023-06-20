import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { Card } from 'src/app/models/card.model';


@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  filteredCardListSubject$: BehaviorSubject<Card[]> = new BehaviorSubject<Card[]>([]);
  
  cardList: Card[] = [];
 

  private readonly _BASE_URL_USER: string = "http://localhost:8080/users";
  private readonly _BASE_URL_CARD: string = "http://localhost:8080/cards";



  constructor(private http: HttpClient) { }


  getCardList(): Observable<Card[]> {
    return this.http.get<Card[]>(`${this._BASE_URL_CARD}/all`)
  }


  postFilterCardList(filteredCardList: Card[],) {
    this.filteredCardListSubject$.next([...filteredCardList]);
  }

  getFilteredCardList$(): Observable<Card[]> {
    return this.filteredCardListSubject$.asObservable();
  }


}
