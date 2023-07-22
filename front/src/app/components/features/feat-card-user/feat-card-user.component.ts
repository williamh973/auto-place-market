import { Component, Input } from '@angular/core';
import { Card } from 'src/app/models/card.model';
import { User } from 'src/app/models/user.model';


@Component({
  selector: 'app-feat-card-user',
  templateUrl: './feat-card-user.component.html',
  styleUrls: ['./feat-card-user.component.scss']
})
export class FeatCardUserComponent {

  @Input() card!: Card;

  @Input() 
  createMode: boolean = false;

  isEditCardFormOpen: boolean = false;
  isFavorite: boolean = false;
  isConfirmDeletePopup: boolean = false;



  openEditForm() {
    this.isEditCardFormOpen = !this.isEditCardFormOpen;
  }


openConfirmDeletePopup() {
  this.isConfirmDeletePopup = true;
}
 

toggleFavorite() {
  this.isFavorite = !this.isFavorite;
}

onRecevedMethodForCloseConfirmDeletePopup(isConfirmDeletePopup: boolean) {
  this.isConfirmDeletePopup = isConfirmDeletePopup;
}

onRecevedMethodForCloseEditCardForm(isEditCardFormOpen: boolean) {
  this.isEditCardFormOpen = isEditCardFormOpen;
}

}
