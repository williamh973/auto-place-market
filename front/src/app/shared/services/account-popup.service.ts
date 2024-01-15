import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class AccountPopupService {

    private isAccountPopupOpenSubject$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  
    isAccountPopupOpen$ = this.isAccountPopupOpenSubject$.asObservable();
  

    openPopup() {
      this.isAccountPopupOpenSubject$.next(true);
      console.log(this.isAccountPopupOpenSubject$);
      
    }
  
    closePopup() {
      this.isAccountPopupOpenSubject$.next(false);
    }

  


  }