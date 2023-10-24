import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Notification } from 'src/app/models/notification.model';
import { User } from 'src/app/models/user.model';


@Injectable({
  providedIn: 'root'
})


export class NotificationService {

  
  private readonly _BASE_URL_MESSAGE: string = "http://localhost:8080/notifications";
  
  
  constructor(private http: HttpClient) { }

  
  getAllNotifications(): Observable<Notification[]> {
    return this.http.get<Notification[]>(`${this._BASE_URL_MESSAGE}/all`);
  }

  createNotification(notification: Notification, user: User): Observable<Notification> {
    user = notification.user;
    const userId = notification.user.id;

    notification.timestamp = new Date();
    
    return this.http.post<Notification>(`${this._BASE_URL_MESSAGE}/add?userId=${userId}`, notification);
  }

  deleteNotification(id: number): Observable<void> {
    return this.http.delete<void>(`${this._BASE_URL_MESSAGE}/delete/${id}`);
  }


}