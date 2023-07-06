import { Component, Input, OnInit } from '@angular/core';
import { Card } from 'src/app/models/card.model';


@Component({
  selector: 'app-feat-card-admin',
  templateUrl: './feat-card-admin.component.html',
  styleUrls: ['./feat-card-admin.component.scss']
})
export class FeatCardAdminComponent implements OnInit {

  @Input() cardChild!: Card;

  isCardEditFormToggle: boolean = false;
  isFavorite: boolean = false;
  isConfirmDeletePopup: boolean = false;




  toggleCardEditForm(value: boolean) {
    this.isCardEditFormToggle = value;
  }

  openEditDialogue() {
    this.isCardEditFormToggle = !this.isCardEditFormToggle;
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

}
