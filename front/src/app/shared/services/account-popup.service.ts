import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class loginOrRegisterPopupService {
  private isLoginOrRegisterPopupOpenSubject$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  isLoginOrRegisterPopupOpen$ =
    this.isLoginOrRegisterPopupOpenSubject$.asObservable();

  openPopup() {
    this.isLoginOrRegisterPopupOpenSubject$.next(true);
  }

  closePopup() {
    this.isLoginOrRegisterPopupOpenSubject$.next(false);
  }
}
