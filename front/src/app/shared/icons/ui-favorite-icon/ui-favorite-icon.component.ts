import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-ui-favorite-icon',
  templateUrl: './ui-favorite-icon.component.html',
  styleUrls: ['./ui-favorite-icon.component.scss'],
})
export class UiFavoriteIconComponent {
  @Input() isFavorite!: boolean;
}
