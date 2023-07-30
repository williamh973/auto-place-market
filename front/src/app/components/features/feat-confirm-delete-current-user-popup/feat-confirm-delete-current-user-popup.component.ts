import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { DbUserService } from 'src/app/shared/services/db-user.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { TokenService } from 'src/app/shared/services/token.service';

@Component({
  selector: 'app-feat-confirm-delete-current-user-popup',
  templateUrl: './feat-confirm-delete-current-user-popup.component.html',
  styleUrls: ['./feat-confirm-delete-current-user-popup.component.scss']
})
export class FeatConfirmDeleteCurrentUserPopupComponent {

  @Output() onisConfirmDeletePopupEmit: EventEmitter<boolean> = new EventEmitter<boolean>();

  isConfirmDeleteCurrentUserPopupOpen: boolean = false;

  constructor(
    private dbUserService: DbUserService,
    private router: Router,
    private lsService: LocalStorageService,) {}


  deleteCurrentUser() {
    this.dbUserService.deleteCurrentUser().subscribe(
      (response) => {
        this.lsService.clearToken();
        localStorage.removeItem('userEmail');
        this.router.navigate(["/home"]); 
      },
      (error) => {
        
      }
    );
  }

  onCloseConfirmeDeletePopup() {
    this.onisConfirmDeletePopupEmit.emit(this.isConfirmDeleteCurrentUserPopupOpen); 
  }

}
