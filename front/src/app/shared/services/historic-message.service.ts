import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { HistoricMessage } from 'src/app/models/historic-message.model';
import { User } from 'src/app/models/user.model';




@Injectable({
  providedIn: 'root'
})
export class HistoricMessageService {

  
  messageList: HistoricMessage[] = [];
  filteredMessageListSubject$: BehaviorSubject<HistoricMessage[]> = new BehaviorSubject<HistoricMessage[]>([]);
  
  messageListCreatedByUser: HistoricMessage[] = [];
  filteredMessageListCreatedByUserSubject$: BehaviorSubject<HistoricMessage[]> = new BehaviorSubject<HistoricMessage[]>([]);

  
  private readonly _BASE_URL_MESSAGE: string = "http://localhost:8080/historicMessages";
 

  constructor(private http: HttpClient) { }


  getMessageById(id: number): Observable<HistoricMessage> {
    return this.http.get<HistoricMessage>(`${this._BASE_URL_MESSAGE}/${id}`);
  }

  createMessageDuplicata(historicMessage: HistoricMessage, user: User): Observable<HistoricMessage> {
    
    historicMessage.timestamp = new Date();
    historicMessage.receiver = user;

    const selectedUserId = historicMessage.receiver.id;
    
    return this.http.post<HistoricMessage>(`${this._BASE_URL_MESSAGE}/admin/add?selectedUserId=${selectedUserId}`, historicMessage);
  }

  deleteMessage(id: number): Observable<void> {
    return this.http.delete<void>(`${this._BASE_URL_MESSAGE}/delete/${id}`);
  }

 

  postFilterMessageList(filteredMessageList: HistoricMessage[],) {
    this.filteredMessageListSubject$.next([...filteredMessageList]);
  }
  getFilteredMessageList$(): Observable<HistoricMessage[]> {
    return this.filteredMessageListSubject$.asObservable();
  }
  

  postFilterMessageListCreatedByUser(filteredMessageListCreatedByUser: HistoricMessage[],) {
    this.filteredMessageListCreatedByUserSubject$.next([...filteredMessageListCreatedByUser]);
  }
  getFilteredMessageListCreatedByUser$(): Observable<HistoricMessage[]> {
    return this.filteredMessageListCreatedByUserSubject$.asObservable();
  }


}
