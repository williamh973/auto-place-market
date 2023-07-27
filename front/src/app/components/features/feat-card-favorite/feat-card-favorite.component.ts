import { Component, Input } from '@angular/core';
import { Card } from 'src/app/models/card.model';
import { FavoriteService } from 'src/app/shared/services/favorite.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { TokenService } from 'src/app/shared/services/token.service';


@Component({
  selector: 'app-feat-card-favorite',
  templateUrl: './feat-card-favorite.component.html',
  styleUrls: ['./feat-card-favorite.component.scss']
})
export class FeatCardFavoriteComponent {

  @Input() card!: Card

}

