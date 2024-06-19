import { Component, HostListener } from '@angular/core';
import { catchError, of } from 'rxjs';
import { TokenValidityService } from 'src/app/shared/services/token-validity.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent {
  favoriteCards: number[] = [];
  isComputerResolution: boolean = false;
  isTabletResolution: boolean = false;
  isHomePageCardListOpen: boolean = true;
  isFavorite: boolean = false;
  isAnimationTrackHttpStatusActive: boolean = false;

  constructor(private tokenValidityService: TokenValidityService) {}

  ngOnInit() {
    const screenWidth = window.innerWidth;
    this.isTabletResolution = screenWidth > 767 && screenWidth <= 1299;
    this.isComputerResolution = screenWidth >= 1300;

    this.tokenValidityService
      .getTokenValidity()
      .pipe(
        catchError((error) => {
          if (error.status === 401) {
            return of(false);
          }
          this.isAnimationTrackHttpStatusActive = true;
          setTimeout(() => {
            this.isAnimationTrackHttpStatusActive = false;
          }, 8000);
          throw error;
        })
      )
      .subscribe();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    const screenWidth = window.innerWidth;
    this.isTabletResolution = screenWidth > 767 && screenWidth <= 1299;
    this.isComputerResolution = screenWidth >= 1300;
  }
}
