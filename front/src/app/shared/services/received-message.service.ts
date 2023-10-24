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


  createMessage(receivedMessage: ReceivedMessage, user: User, receiver: User): Observable<ReceivedMessage> {
    
    receivedMessage.timestamp = new Date();
    receivedMessage.user = user;
    receivedMessage.receiver = receiver;
    
    const senderUserId = receivedMessage.user.id;
    const selectedUserId = receivedMessage.receiver.id;
    

    return this.http.post<ReceivedMessage>(`${this._BASE_URL_MESSAGE}/admin/add?senderUserId=${senderUserId}&selectedUserId=${selectedUserId}`, receivedMessage);
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
