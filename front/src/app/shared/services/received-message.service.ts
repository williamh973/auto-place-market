import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { ReceivedMessage } from 'src/app/models/received-message.model';
import { User } from 'src/app/models/user.model';




@Injectable({
  providedIn: 'root'
})
export class ReceivedMessageService {

  
  messageList: ReceivedMessage[] = [];
  filteredMessageListSubject$: BehaviorSubject<ReceivedMessage[]> = new BehaviorSubject<ReceivedMessage[]>([]);
  
  messageListCreatedByUser: ReceivedMessage[] = [];
  filteredMessageListCreatedByUserSubject$: BehaviorSubject<ReceivedMessage[]> = new BehaviorSubject<ReceivedMessage[]>([]);

  
  private readonly _BASE_URL_MESSAGE: string = "http://localhost:8080/receivedMessages";
 

  constructor(private http: HttpClient) { }



  getAllMessages(): Observable<ReceivedMessage[]> {
    return this.http.get<ReceivedMessage[]>(`${this._BASE_URL_MESSAGE}/all`);
  }

  getMessageById(id: number): Observable<ReceivedMessage> {
    return this.http.get<ReceivedMessage>(`${this._BASE_URL_MESSAGE}/${id}`);
  }

  createUserMessage(message: ReceivedMessage): Observable<ReceivedMessage> {
    message.timestamp = new Date();
    return this.http.post<ReceivedMessage>(`${this._BASE_URL_MESSAGE}/add`, message);
  }

  createAdminMessage(receivedMessage: ReceivedMessage, user: User, receiver: User): Observable<ReceivedMessage> {
    
    receivedMessage.timestamp = new Date();
    receivedMessage.receiver = receiver;
    receivedMessage.sender = user;
    
    const senderUserId = receivedMessage.sender.id;
    const selectedUserId = receivedMessage.receiver.id;
    

    return this.http.post<ReceivedMessage>(`${this._BASE_URL_MESSAGE}/admin/add?senderUserId=${senderUserId}&selectedUserId=${selectedUserId}`, receivedMessage);
  }

  updateMessage(message: ReceivedMessage): Observable<ReceivedMessage> {
    return this.http.put<ReceivedMessage>(`${this._BASE_URL_MESSAGE}/update/${message.id}`, message);
  } 

  deleteMessage(id: number): Observable<void> {
    return this.http.delete<void>(`${this._BASE_URL_MESSAGE}/delete/${id}`);
  }

 

  postFilterMessageList(filteredMessageList: ReceivedMessage[],) {
    this.filteredMessageListSubject$.next([...filteredMessageList]);
  }
  getFilteredMessageList$(): Observable<ReceivedMessage[]> {
    return this.filteredMessageListSubject$.asObservable();
  }
  

  postFilterMessageListCreatedByUser(filteredMessageListCreatedByUser: ReceivedMessage[],) {
    this.filteredMessageListCreatedByUserSubject$.next([...filteredMessageListCreatedByUser]);
  }
  getFilteredMessageListCreatedByUser$(): Observable<ReceivedMessage[]> {
    return this.filteredMessageListCreatedByUserSubject$.asObservable();
  }


}
