import { Component, Input } from '@angular/core';
import { Card } from 'src/app/models/card.model';

@Component({
  selector: 'app-feat-card-preview',
  templateUrl: './feat-card-preview.component.html',
  styleUrls: ['./feat-card-preview.component.scss']
})
export class FeatCardPreviewComponent {

  @Input() card!: Card
  @Input() createMode: boolean = false;

  firstPictureSrc: string = '';

  ngOnInit(): void {

    if (this.card.picturesList.length > 0) {
      this.firstPictureSrc = this.card.picturesList[0].src;
    }
  }

}
