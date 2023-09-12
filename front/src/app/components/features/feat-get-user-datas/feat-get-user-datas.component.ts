import { Component, OnInit } from '@angular/core';
import { DbUserService } from '../../../shared/services/db-user.service';
import { Observable } from 'rxjs';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-feat-get-user-datas',
  templateUrl: './feat-get-user-datas.component.html',
  styleUrls: ['./feat-get-user-datas.component.scss']
})
export class GetUserDatasComponent implements OnInit {


  userEmailToGet: string = "";
  userFechted$!: Observable<User>;
  allUsersFetched$!: Observable<User[]>;
  showSearchProfilForm: boolean = false;
  showSearchProfilResult: boolean = false;
  isContactPopupFormOpen: boolean = false;
  isAdminMode: boolean = false;
  
  selectedUser!: User; 


  constructor(private dbUser: DbUserService) { }


  ngOnInit() {

  }


  onOpenSearchProfilForm() {
    this.showSearchProfilForm = !this.showSearchProfilForm
    this.showSearchProfilResult = false;
   }
 

  onSubmit() {
    this.showSearchProfilResult = true;
    this.userFechted$ = this.dbUser.getUserByEmail(this.userEmailToGet);
  }

  getAllUsers() {
    this.allUsersFetched$ = this.dbUser.getAllUsers();
  }

   onRecevedMethodForCloseContactForm(isContactPopupFormOpen: boolean) {
    this.isContactPopupFormOpen = isContactPopupFormOpen;
  }

  onContactFormOpen(user: User) {
    this.selectedUser = user;
    this.isContactPopupFormOpen = !this.isContactPopupFormOpen;
  }
  updateSelectedUserForSendMessage(user: User) {
    this.selectedUser = user;
  }

}
