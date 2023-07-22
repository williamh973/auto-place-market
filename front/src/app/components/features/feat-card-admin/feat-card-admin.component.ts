import { Component, Input, OnInit } from '@angular/core';
import { Card } from 'src/app/models/card.model';
import { User } from 'src/app/models/user.model';


@Component({
  selector: 'app-feat-card-admin',
  templateUrl: './feat-card-admin.component.html',
  styleUrls: ['./feat-card-admin.component.scss']
})
export class FeatCardAdminComponent implements OnInit {

  @Input() card!: Card;


  isEditCardFormOpen: boolean = false;
  isFavorite: boolean = false;
  isConfirmDeletePopup: boolean = false;



  openEditDialogue() {
    this.isEditCardFormOpen = !this.isEditCardFormOpen;
  }

ngOnInit() {
  
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
