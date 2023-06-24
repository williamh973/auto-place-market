import { Component, Input, OnInit } from '@angular/core';
import { Card } from 'src/app/models/card.model';
import { YoutubeService } from 'src/app/shared/services/youtube.service';



@Component({
  selector: 'app-feat-youtube-card',
  templateUrl: './feat-card.component.html',
  styleUrls: ['./feat-card.component.scss']
})
export class FeatCardComponent implements OnInit {

  @Input() cardChild!: Card;

  isCardEditFormToggle: boolean = false;


  constructor(private youtubeService: YoutubeService) {}

  toggleCardEditForm(value: boolean) {
    this.isCardEditFormToggle = value;
  }

  openEditDialogue() {
    this.isCardEditFormToggle = !this.isCardEditFormToggle;
  }

ngOnInit() {
  
}

deleteCard() {
  this.youtubeService.delete(this.cardChild.id as number).subscribe();
  window.location.reload();
}


}
