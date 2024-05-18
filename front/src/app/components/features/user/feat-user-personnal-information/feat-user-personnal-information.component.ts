import { Component, Input } from '@angular/core';
import { User } from 'src/app/models/user.model';


@Component({
  selector: 'app-feat-user-personnal-information',
  templateUrl: './feat-user-personnal-information.component.html',
  styleUrls: ['./feat-user-personnal-information.component.scss']
})
export class FeatUserPersonnalInformationComponent {

  @Input() user!: User;   

  isPersonnalInformationPopupOpen: boolean = false;
  isLoadingComposantActive: boolean = false;
  isUpdateinformationFormOpen: boolean = false;
  
  dataToUpdate: string = "firstname" || "lastname";
  
 
  onUpdateFirstname() {
    this.dataToUpdate = 'firstname';
    this.isUpdateinformationFormOpen = true;
  }

  onUpdateLastname() {
    this.dataToUpdate = 'lastname';
    this.isUpdateinformationFormOpen = true;
  }

  onForCloseUpdateinformationForm(isUpdateinformationFormOpen: boolean) {
     this.isUpdateinformationFormOpen = isUpdateinformationFormOpen
  }


}
