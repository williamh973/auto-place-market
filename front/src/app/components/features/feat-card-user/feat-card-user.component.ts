import { Component, Input } from '@angular/core';
import { Card } from 'src/app/models/card.model';
import { User } from 'src/app/models/user.model';
import { DbUserService } from 'src/app/shared/services/db-user.service';
import { FavoriteService } from 'src/app/shared/services/favorite.service';


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
  isConfirmUpdatePopupOpen: boolean = false;

  firstPictureSrc: string = '';



  ngOnInit(): void {

    if (this.card.picturesList.length > 0) {
      this.firstPictureSrc = this.card.picturesList[0].src;
    }
  }


openConfirmDeletePopup() {
  this.isConfirmDeletePopup = true;
}

openConfirmeUpdateFormPopup() {
  this.isConfirmUpdatePopupOpen = true;
}

 

toggleFavorite() {
  this.isFavorite = !this.isFavorite;
}

onRecevedMethodForCloseConfirmDeletePopup(isConfirmDeletePopup: boolean) {
  this.isConfirmDeletePopup = isConfirmDeletePopup;
}

onRecevedMethodForCloseConfirmUpdateCardFormPopup(isConfirmUpdatePopupOpen: boolean) {
this.isConfirmUpdatePopupOpen = isConfirmUpdatePopupOpen;
}


}
