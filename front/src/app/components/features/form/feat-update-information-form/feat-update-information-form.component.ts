import { Component, EventEmitter, Input, Output } from '@angular/core';
import { map } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { DbUserService } from 'src/app/shared/services/db-user.service';
import { TokenService } from 'src/app/shared/services/token.service';

@Component({
  selector: 'app-feat-update-information-form',
  templateUrl: './feat-update-information-form.component.html',
  styleUrls: ['./feat-update-information-form.component.scss']
})
export class FeatUpdateInformationFormComponent {

  @Output() onUpdateinformationFormOpen: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() user!: User; 
  @Input() dataToUpdate!: string;
  
  isUpdateinformationFormOpen: boolean = false;
  newFirstname: string = '';
  newLastname: string = '';


  constructor(private dbUser: DbUserService,  private tokenS: TokenService,) {}


  submit() {
    if(this.user.id && this.dataToUpdate === 'firstname') {
      this.dbUser.updateUserFirstname(this.user.id, this.newFirstname).subscribe(
        () => {
          this.user.firstname = this.newFirstname;
          console.log("firstname après : ", this.user.firstname);
        },
        (error) => {
          console.log("erreur lors de la modification du firstname");
        }
      );
    } else if (this.user.id && this.dataToUpdate === 'lastname') {
      this.dbUser.updateUserLastname(this.user.id, this.newLastname).subscribe(
        () => {
          this.user.lastname = this.newLastname;
          console.log("lastname après", this.user.lastname);
        },
        (error) => {
          console.log("erreur lors de la modification du lastname");
        }
      );
    }
  }

  onCancelPopup() {
    this.onUpdateinformationFormOpen.emit(this.isUpdateinformationFormOpen);
  }
  
}
