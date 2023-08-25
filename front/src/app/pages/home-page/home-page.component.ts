import { Component, HostListener } from '@angular/core';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
  
  favoriteCards: number[] = [];
  
  isComputerResolution: boolean = false;
  isTabletResolution: boolean = false;
  isHomePageCardListOpen: boolean = true;
  isFavorite: boolean = false;


  constructor(
    ) {}
  
  
  ngOnInit() {
    const screenWidth = window.innerWidth;
    this.isTabletResolution = screenWidth > 767 && screenWidth <= 1299; 
    this.isComputerResolution = screenWidth >= 1300; 

  }
  
  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    const screenWidth = window.innerWidth;
    this.isTabletResolution = screenWidth > 767 && screenWidth <= 1299; 
    this.isComputerResolution = screenWidth >= 1300; 
  }

}