import { Component, HostListener } from '@angular/core';
import { FavoriteStatusService } from 'src/app/shared/services/favorite-status.service';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
  
  favoriteCards: number[] = [];
  
  isComputerResolution: boolean = false;
  isTabletResolution: boolean = false;


  constructor(
    private favoriteStatusService: FavoriteStatusService,
  ) {}
  
  
  ngOnInit() {
    const screenWidth = window.innerWidth;
    this.isTabletResolution = screenWidth > 767 && screenWidth <= 1299; 
    this.isComputerResolution = screenWidth >= 1300; 
    
      this.favoriteStatusService.getFavoriteCardsSubject$().subscribe((favoriteCards) => {
        this.favoriteCards = favoriteCards;
      });
  }
  
  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    const screenWidth = window.innerWidth;
    this.isTabletResolution = screenWidth > 767 && screenWidth <= 1299; 
    this.isComputerResolution = screenWidth >= 1300; 
  }

}