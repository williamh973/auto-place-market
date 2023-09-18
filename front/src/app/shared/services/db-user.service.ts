import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { User } from '../../models/user.model';
import { HttpClient } from '@angular/common/http';
import { Card } from 'src/app/models/card.model';
import { Message } from 'src/app/models/message.model';


@Injectable({
  providedIn: 'root'
})
export class DbUserService {

  cardListCreatedByUser: Card[] = [];
  filteredCardListCreatedByUserSubject$: BehaviorSubject<Card[]> = new BehaviorSubject<Card[]>([]);

  private readonly _BASE_URL = "http://localhost:8080/api/v1/users";


  constructor(
    private http: HttpClient
    ) { }


  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this._BASE_URL}/all`);
  }

  getUserByEmail(email: string): Observable<User> {
    return this.http.get<User>(`${this._BASE_URL}/email/${email}`);
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this._BASE_URL}/${id}`);
  }

  getUserFirstnameForUserPage(): Observable<string> {
    return this.http.get(`${this._BASE_URL}/current/firstname`, { responseType: 'text' })
      .pipe(
        map(response => response as string) 
      );
  }
  
  getUserLastnameForUserPage(): Observable<string> {
    return this.http.get(`${this._BASE_URL}/current/lastname`, { responseType: 'text' })
      .pipe(
        map(response => response as string)
      );
  } 

  getUserCards(): Observable<Card[]> {
    return this.http.get<Card[]>(`${this._BASE_URL}/current/cardList`);
  }

  getUserMessages(): Observable<Message[]> {
    return this.http.get<Message[]>(`${this._BASE_URL}/current/sentMessagesList`);
  }

  deleteCurrentUser(): Observable<void> {
    return this.http.delete<void>(`${this._BASE_URL}/current/delete`);
  }

  disabledUser(userId: number): Observable<User[]> {
    return this.http.put<User[]>(`${this._BASE_URL}/disable/${userId}`, {});
  }

  enabledUser(userId: number): Observable<User[]> {
    return this.http.put<User[]>(`${this._BASE_URL}/enable/${userId}`, {});
  }
 
  // getUserBlockStatus(userId: number): Observable<boolean> {
  //   return this.http.get<boolean>(`${this._BASE_URL}/blockStatus/${userId}`);
  // }


  postFilterCardListCreatedByUser(filteredCardListCreatedByUser: Card[],) {
    this.filteredCardListCreatedByUserSubject$.next([...filteredCardListCreatedByUser]);
  }
  getFilteredCardListCreatedByUser$(): Observable<Card[]> {
    return this.filteredCardListCreatedByUserSubject$.asObservable();
  }


}
