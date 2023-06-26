import { Component, Input, OnInit } from '@angular/core';
import { Card } from 'src/app/models/card.model';
import { CardService } from 'src/app/shared/services/card.service';



@Component({
  selector: 'app-feat-card',
  templateUrl: './feat-card.component.html',
  styleUrls: ['./feat-card.component.scss']
})
export class FeatCardComponent implements OnInit {

  @Input() cardChild!: Card;

  isCardEditFormToggle: boolean = false;
  isFavorite: boolean = false;
  isConfirmDeletePopup: boolean = false;


  constructor(private cardService: CardService) {}

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
