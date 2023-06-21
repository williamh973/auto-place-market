import { Component, Input, OnInit } from '@angular/core';
import { Card } from 'src/app/models/card.model';



@Component({
  selector: 'app-feat-youtube-card',
  templateUrl: './feat-youtube-card.component.html',
  styleUrls: ['./feat-youtube-card.component.scss']
})
export class FeatYoutubeCardComponent implements OnInit {

  @Input() cardChild!: Card;

  isCardEditFormToggle: boolean = false;

  openEditDialogue() {
    this.isCardEditFormToggle = !this.isCardEditFormToggle;
  }

ngOnInit() {
}


}
