import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { User } from '../../models/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalStorageService } from './local-storage.service';
import { Card } from 'src/app/models/card.model';


@Injectable({
  providedIn: 'root'
})
export class DbUserService {

  private readonly _BASE_URL = "http://localhost:8080/api/v1/users";


  constructor(
    private http: HttpClient,
    private lsService: LocalStorageService) { }




  getOneUser(email: string): Observable<User> {
    return this.http.get<User>(`${this._BASE_URL}/email/${email}`);
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this._BASE_URL}/all`);
  }

  getUserFirstnameForUserPage(): Observable<string> {
    return this.http.get(`${this._BASE_URL}/firstname`, { responseType: 'text' })
      .pipe(
        map(response => response as string) 
      );
  }
  
  getUserLastnameForUserPage(): Observable<string> {
    return this.http.get(`${this._BASE_URL}/lastname`, { responseType: 'text' })
      .pipe(
        map(response => response as string)
      );
  } 

  getUserCards(): Observable<Card[]> {
    return this.http.get<Card[]>(`${this._BASE_URL}/cardList`);
  }

}
