import { Component, Input } from '@angular/core';
import { Card } from 'src/app/models/card.model';


@Component({
  selector: 'app-feat-card-user',
  templateUrl: './feat-card-user.component.html',
  styleUrls: ['./feat-card-user.component.scss']
})
export class FeatCardUserComponent {

  @Input() card!: Card;

  isCardEditFormToggle: boolean = false;
  isFavorite: boolean = false;
  isConfirmDeletePopup: boolean = false;




  toggleCardEditForm(value: boolean) {
    this.isCardEditFormToggle = value;
  }

  openEditDialogue() {
    this.isCardEditFormToggle = !this.isCardEditFormToggle;
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


}
