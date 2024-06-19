import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { Menu } from 'src/app/models/menu.model';
import { loginOrRegisterPopupService } from 'src/app/shared/services/account-popup.service';
import { TokenService } from 'src/app/shared/services/token.service';

@Component({
  selector: 'app-feat-navbar',
  templateUrl: './feat-navbar.component.html',
  styleUrls: ['./feat-navbar.component.scss'],
})
export class FeatNavbarComponent {
  menuItems: Menu[] = [
    new Menu('Mettre ma voiture', ''),
    new Menu('Notre concept', '/concept'),
    new Menu('Mon compte', '/user-space'),
    new Menu('Contact', ''),
  ];

  constructor(
    private tokenService: TokenService,
    public loginOrRegisterPopupService: loginOrRegisterPopupService,
    private router: Router
  ) {}

  isLoginOrRegisterPopupOpen: boolean = false;
  isEditCardFormOpen: boolean = false;
  isContactPopupFormOpen: boolean = false;
  isMenuOpen: boolean = false;
  isComputerResolution: boolean = false;
  isTabletResolution: boolean = false;

  delaySecondsForAnimationSearchBar: number = 2;

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

  onEditCardFormOpen() {
    if (this.tokenService.isCheckTokenInLocalStorage()) {
      this.isEditCardFormOpen = !this.isEditCardFormOpen;
      this.loginOrRegisterPopupService.closePopup();
    } else {
      this.loginOrRegisterPopupService.openPopup();
    }
  }

  onContactPopupFormOpen() {
    if (this.tokenService.isCheckTokenInLocalStorage()) {
      this.isContactPopupFormOpen = !this.isContactPopupFormOpen;
    } else {
      this.loginOrRegisterPopupService.openPopup();
    }
  }

  onRecevedMethodForCloseEditCardForm(isEditCardFormOpen: boolean) {
    this.isEditCardFormOpen = isEditCardFormOpen;
  }

  onRecevedMethodForCloseContactForm(isContactPopupFormOpen: boolean) {
    this.isContactPopupFormOpen = isContactPopupFormOpen;
  }

  onOpenMenuToggle() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  onMenuItemClick(menuItem: Menu) {
    if (menuItem.label === 'Mettre ma voiture') {
      this.onEditCardFormOpen();
    } else if (menuItem.label === 'Notre concept') {
      this.router.navigate(['/concept']);
    } else if (menuItem.label === 'Mon compte') {
      this.router.navigate(['/user-space']);
    } else if (menuItem.label === 'Contact') {
      this.onContactPopupFormOpen();
    }
  }
}
