import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map } from 'rxjs';
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


  constructor(private http: HttpClient) { }


  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this._BASE_URL}/all`);
  }

  getUserByEmail(email: string): Observable<User> {
    return this.http.get<User>(`${this._BASE_URL}/email/${email}`);
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this._BASE_URL}/${id}`);
  }

  getCurrentUserData(): Observable<User> {
    return this.http.get<User>(`${this._BASE_URL}/current/data`);
  }

  getUserCards(): Observable<Card[]> {
    return this.http.get<Card[]>(`${this._BASE_URL}/current/cardList`);
  }

  getUserMessages(): Observable<Message[]> {
    return this.http.get<Message[]>(`${this._BASE_URL}/current/sentMessagesList`);
  }

  getAllUserDisabled(): Observable<User[]> {
    return this.http.get<User[]>(`${this._BASE_URL}/disable/all`);
  }

  disabledUser(userId: number): Observable<User[]> {
    return this.http.put<User[]>(`${this._BASE_URL}/disable/${userId}`, {});
  }

  enabledUser(userId: number): Observable<User[]> {
    return this.http.put<User[]>(`${this._BASE_URL}/enable/${userId}`, {});
  }

  updateUserFirstname(userId: number, newFirstname: string): Observable<User[]> {
    const params = { newFirstname };
    return this.http.put<User[]>(`${this._BASE_URL}/updateFirstname/${userId}`, null, { params });
  }
  

  updateUserLastname(userId: number, newLastname: string): Observable<User[]> {
    const params = { newLastname };
    return this.http.put<User[]>(`${this._BASE_URL}/updateLastname/${userId}`, null, { params });
  }

  deleteCurrentUser(): Observable<void> {
    return this.http.delete<void>(`${this._BASE_URL}/current/delete`);
  }




  getFilteredCardListCreatedByUser$(): Observable<Card[]> {
    return this.filteredCardListCreatedByUserSubject$.asObservable();
  }

  postFilterCardListCreatedByUser(filteredCardListCreatedByUser: Card[],) {
    this.filteredCardListCreatedByUserSubject$.next([...filteredCardListCreatedByUser]);
  }


}
