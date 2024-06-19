import { Component, Input } from '@angular/core';

import { Card } from 'src/app/models/card.model';
import { Favorite } from 'src/app/models/favorite.model';
import { FavoriteService } from 'src/app/shared/services/favorite.service';
import { TokenService } from 'src/app/shared/services/token.service';

@Component({
  selector: 'app-feat-card',
  templateUrl: './feat-card.component.html',
  styleUrls: ['./feat-card.component.scss'],
})
export class FeatCardComponent {
  @Input() card!: Card;

  isCardEditFormToggle: boolean = false;
  isFavorite: boolean = false;
  isConfirmDeletePopup: boolean = false;
  isCardFavoriteAdded: boolean = false;
  isCardFavoriteAddedError: boolean = false;
  isCardFavoriteDelete: boolean = false;
  isCardFavoritedDeleteError: boolean = false;
  isUserLoggedInForAddFavorite: boolean = false;
  isAnimationPopupCardOperationStatusActive: boolean = false;
  firstPictureSrc: string = '';
  currentUserFavoriteList: Favorite[] = [];

  constructor(
    private favoriteService: FavoriteService,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    this.card.picturesList.sort(
      (pictureA, pictureB) => (pictureA.id ?? 0) - (pictureB.id ?? 0)
    );
    this.cardFirstPictureInit();
    this.onGetCurrentUserFavoriteList();
  }

  private cardFirstPictureInit() {
    if (this.card.picturesList.length > 0) {
      this.firstPictureSrc = this.card.picturesList[0].src;
    }
  }

  private showCardOperationStatusForFavoriteAdded() {
    this.isCardFavoriteAdded = true;
    this.isAnimationPopupCardOperationStatusActive = true;
    setTimeout(() => {
      this.isCardFavoriteAdded = false;
      this.isAnimationPopupCardOperationStatusActive = false;
    }, 3000);
  }

  private showCardOperationStatusForFavoriteDeleted() {
    this.isCardFavoriteDelete = true;
    this.isAnimationPopupCardOperationStatusActive = true;
    setTimeout(() => {
      this.isCardFavoriteDelete = false;
      this.isAnimationPopupCardOperationStatusActive = false;
    }, 3000);
  }

  private isUserNotConnected() {
    this.isUserLoggedInForAddFavorite = true;
    this.isAnimationPopupCardOperationStatusActive = true;
    setTimeout(() => {
      this.isUserLoggedInForAddFavorite = false;
      this.isAnimationPopupCardOperationStatusActive = false;
    }, 3000);
    this.isFavorite = !this.isFavorite;
  }

  private onGetCurrentUserFavoriteList() {
    this.favoriteService
      .getCurrentUserFavoriteList()
      .subscribe((favorite: Favorite[]) => {
        this.currentUserFavoriteList = favorite;
        this.isFavorite = this.currentUserFavoriteList.some(
          (favorite) => favorite.card.id === this.card.id
        );
      });
  }

  private onAddCardInFavoriteList() {
    this.favoriteService
      .addCardInFavoriteList(this.card.id!)
      .subscribe((success) => {
        this.onGetCurrentUserFavoriteList();
        this.showCardOperationStatusForFavoriteAdded();
      });
  }

  private onDeleteCardInFavoriteList() {
    const findCardInFavorite = this.currentUserFavoriteList.find(
      (cardFound) => cardFound.card.id === this.card.id
    );
    if (findCardInFavorite) {
      this.favoriteService.deleteFavorite(findCardInFavorite).subscribe(() => {
        this.isFavorite = !this.isFavorite;
        this.showCardOperationStatusForFavoriteDeleted();
      });
    }
  }

  toggleFavorite() {
    const token = this.tokenService.isCheckTokenInLocalStorage();
    if (token) {
      this.isFavorite = !this.isFavorite;
      if (this.isFavorite) {
        this.onAddCardInFavoriteList();
      } else {
        this.onDeleteFavorite();
      }
    } else {
      this.isUserNotConnected();
      this.isFavorite = false;
    }
  }

  onDeleteFavorite() {
    const token = this.tokenService.isCheckTokenInLocalStorage();
    if (token) {
      this.isFavorite = !this.isFavorite;
      if (this.isFavorite) {
        this.onDeleteCardInFavoriteList();
      }
    }
  }

  toggleCardEditForm(value: boolean) {
    this.isCardEditFormToggle = value;
  }

  openEditDialogue() {
    this.isCardEditFormToggle = !this.isCardEditFormToggle;
  }

  openConfirmDeletePopup() {
    this.isConfirmDeletePopup = true;
  }

  onRecevedMethodForCloseConfirmDeletePopup(isConfirmDeletePopup: boolean) {
    this.isConfirmDeletePopup = isConfirmDeletePopup;
  }
}
