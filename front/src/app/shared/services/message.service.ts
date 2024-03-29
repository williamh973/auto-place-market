import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { Message } from 'src/app/models/message.model';
import { User } from 'src/app/models/user.model';




@Injectable({
  providedIn: 'root'
})
export class MessageService {

  
  messageList: Message[] = [];
  filteredMessageListSubject$: BehaviorSubject<Message[]> = new BehaviorSubject<Message[]>([]);
  
  messageListCreatedByUser: Message[] = [];
  filteredMessageListCreatedByUserSubject$: BehaviorSubject<Message[]> = new BehaviorSubject<Message[]>([]);

  
  private readonly _BASE_URL_MESSAGE: string = "http://localhost:8080/messages";
 

  constructor(private http: HttpClient) { }



  getAllMessages(): Observable<Message[]> {
    return this.http.get<Message[]>(`${this._BASE_URL_MESSAGE}/all`);
  }

  getMessageById(id: number): Observable<Message> {
    return this.http.get<Message>(`${this._BASE_URL_MESSAGE}/${id}`);
  }

  getMessagesForUser(userId: number): Observable<Message[]> {
    return this.http.get<Message[]>(`${this._BASE_URL_MESSAGE}/user/${userId}`);
  }

  createUserMessage(message: Message): Observable<Message> {
    message.timestamp = new Date();
    return this.http.post<Message>(`${this._BASE_URL_MESSAGE}/add`, message);
  }

  createAdminMessage(message: Message, user: User, selectedUser: User): Observable<Message> {
    
    message.timestamp = new Date();
    message.user = user;
    message.receiver = selectedUser;

    const senderUserId = message.user.id;
    const selectedUserId = message.receiver.id;

    return this.http.post<Message>(`${this._BASE_URL_MESSAGE}/admin/add?senderUserId=${senderUserId}&selectedUserId=${selectedUserId}`, message);
  }

  updateMessage(message: Message): Observable<Message> {
    return this.http.put<Message>(`${this._BASE_URL_MESSAGE}/update/${message.id}`, message);
  } 

  deleteMessage(id: number): Observable<void> {
    return this.http.delete<void>(`${this._BASE_URL_MESSAGE}/delete/${id}`);
  }

 

  postFilterMessageList(filteredMessageList: Message[],) {
    this.filteredMessageListSubject$.next([...filteredMessageList]);
  }
  getFilteredMessageList$(): Observable<Message[]> {
    return this.filteredMessageListSubject$.asObservable();
  }
  

  postFilterMessageListCreatedByUser(filteredMessageListCreatedByUser: Message[],) {
    this.filteredMessageListCreatedByUserSubject$.next([...filteredMessageListCreatedByUser]);
  }
  getFilteredMessageListCreatedByUser$(): Observable<Message[]> {
    return this.filteredMessageListCreatedByUserSubject$.asObservable();
  }


}
