import { Component, Input, OnInit } from '@angular/core';
import { Card } from 'src/app/models/card.model';



@Component({
  selector: 'app-feat-card',
  templateUrl: './feat-card.component.html',
  styleUrls: ['./feat-card.component.scss']
})
export class FeatCardComponent implements OnInit {

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
