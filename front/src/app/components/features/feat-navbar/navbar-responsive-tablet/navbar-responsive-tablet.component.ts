import { Component, HostListener } from '@angular/core';
import { Menu } from 'src/app/models/menu.model';
import { AccountPopupService } from 'src/app/shared/services/account-popup.service';
import { TokenService } from 'src/app/shared/services/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar-responsive-tablet',
  templateUrl: './navbar-responsive-tablet.component.html',
  styleUrls: ['./navbar-responsive-tablet.component.scss']

})
export class NavbarResponsiveTabletComponent {

  menuItems: Menu[] = [
    new Menu('Mettre ma voiture', ''),
    new Menu('Notre concept', '/concept'),
    new Menu('Mon compte', '/user-space'),
    new Menu('Espace Admin', '/admin'),
    new Menu('Contact', '')
  ];


    constructor(
        private tokenService: TokenService,
        public accountPopupService: AccountPopupService,
        private router: Router
        ) {}
    
    
      isAccountPopupOpen: boolean = false;
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
      
      checkToken(): boolean {
        return this.tokenService.checkToken();
      }
    
      onEditCardFormOpen() {
        if (this.checkToken()) {
          this.isEditCardFormOpen = !this.isEditCardFormOpen;
          this.accountPopupService.closePopup();
        } else {
          this.accountPopupService.openPopup();
        }
      }

      onContactPopupFormOpen() {
        this.isContactPopupFormOpen = !this.isContactPopupFormOpen;
      }
    
      onRecevedMethodForCloseEditCardForm(isEditCardFormOpen: boolean) {
        this.isEditCardFormOpen = isEditCardFormOpen;
      }

      onRecevedMethodForCloseContactForm(isContactPopupFormOpen: boolean) {
        this.isContactPopupFormOpen = isContactPopupFormOpen;
      }

      onOpenMenuToggle() {
        this.isMenuOpen = !this.isMenuOpen
      }

      onMenuItemClick(menuItem: Menu) {
        if (menuItem.label === 'Mettre ma voiture') {
          this.onEditCardFormOpen();
        } else if (menuItem.label === 'Notre concept') {
          this.router.navigate(['/concept']);
        } else if (menuItem.label === 'Mon compte') {
          this.router.navigate(['/user-space']);
        } else if (menuItem.label === 'Espace Admin') {
          this.router.navigate(['/admin']);
        } else if (menuItem.label === 'Contact') {
          this.onContactPopupFormOpen();
      }
    }
  
  
  }