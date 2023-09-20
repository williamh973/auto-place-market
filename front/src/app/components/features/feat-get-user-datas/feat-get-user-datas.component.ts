import { Component } from '@angular/core';
import { DbUserService } from '../../../shared/services/db-user.service';
import { Observable } from 'rxjs';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-feat-get-user-datas',
  templateUrl: './feat-get-user-datas.component.html',
  styleUrls: ['./feat-get-user-datas.component.scss']
})
export class GetUserDatasComponent {


  userEmailToGet: string = "";
  userFechted$!: Observable<User>;
  allUsersFetched$!: Observable<User[]>;
  showSearchProfilForm: boolean = false;
  showSearchProfilResult: boolean = false;
  isContactPopupFormOpen: boolean = false;
  isAdminMode: boolean = false;
  isUserDisabled!: boolean;
  selectedUser!: User; 
  

  constructor(private dbUser: DbUserService) { }


  onOpenSearchProfilForm() {
    this.showSearchProfilForm = !this.showSearchProfilForm
    this.showSearchProfilResult = false;
   }
 

  onSubmit() {
    this.showSearchProfilResult = true;
    this.userFechted$ = this.dbUser.getUserByEmail(this.userEmailToGet);
    
    this.userFechted$.subscribe(user => {
      this.isUserDisabled = user.blocked; 
      this.userEmailToGet = user.email
      console.log(this.isUserDisabled);
      
    });
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


  toggleAccountDisabled(user: User) {
    if (user.id && !this.isUserDisabled) {
     this.dbUser.disabledUser(user.id).subscribe(
       () => {
        this.isUserDisabled = !this.isUserDisabled
        console.log(`"compte ${this.userEmailToGet}  suspendu" ${this.isUserDisabled}`);
       },
       (error) => {
         console.log("erreur lors de la suspension du compte", this.isUserDisabled);
       }
     );
    } else if (user.id && this.isUserDisabled) {
      this.dbUser.enabledUser(user.id).subscribe(
        () => {
         this.isUserDisabled = !this.isUserDisabled
         console.log("compte débloqué", this.isUserDisabled);
        },
        (error) => {
          console.log("erreur lors du déblocage du compte", this.isUserDisabled);
        }
      );
    }
  }


}
