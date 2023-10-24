import { Component, EventEmitter, Output } from '@angular/core';
import { map } from 'rxjs';
import { Menu } from 'src/app/models/menu.model';
import { TokenService } from 'src/app/shared/services/token.service';

@Component({
  selector: 'app-feat-drop-down-menu',
  templateUrl: './feat-drop-down-menu.component.html',
  styleUrls: ['./feat-drop-down-menu.component.scss']
})
export class FeatDropDownMenuComponent {

  @Output() isConfirmDeleteCurrentUserPopupOpen: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() isContactPopupFormOpen: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() isUserReceivedMessageListOpen: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() isHistoricMessageListOpen: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() isGetDataOpen: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() isUserDisabledListOpen: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() isPersonnalInformationPopupOpen: EventEmitter<boolean> = new EventEmitter<boolean>();
  

  dropDownAccountMenuItems: Menu[] = [
    new Menu('Supprimer mon compte', ''),
    new Menu('Modifier mes informations', ''),
  ];

  dropDownMessageMenuItems: Menu[] = [
    new Menu('Envoyer une notification', ''),
    new Menu('boîte de réception', ''),
    new Menu('Historique des notifications', ''),
  ];

  dropDownUserMenuItems: Menu[] = [
    new Menu('Rechercher un utilisateur', ''),
    new Menu('Utilisateur bloqué', ''),
  ];

  role!: "ROLE_USER" | "ROLE_ADMIN";


  constructor(private tokenS: TokenService) {}


  ngOnInit() {
    this.tokenS._getTokenDetailsSubject$()
      .pipe(
        map((decodedToken: any) => decodedToken.role)
      )
      .subscribe((role: "ROLE_USER" | "ROLE_ADMIN") => {
        this.role = role;
      });
  }


  onDropdownAccountMenuItem(menuItem: Menu) {  
   
    switch (menuItem.label) {
      case 'Supprimer mon compte':
        this.deleteAccount()
        break;
      case 'Modifier mes informations':
        this.updatePersonnalInformation()
      break;
    }
  }
  
  onDropdownMessageMenuItem(menuItem: Menu) {
    
    switch (menuItem.label) {
      case 'Envoyer une notification':
        this.onContactFormOpen()
      break;
      case 'boîte de réception':
        this.onLoadUserReceivedMessageList()
      break;
      case 'Historique des notifications':
        this.onLoadHistoricMessageList()
      break;
    }
  }

  onDropdownUserMenuItemClick(menuItem: Menu) {

    switch (menuItem.label) {
      case 'Rechercher un utilisateur':
        this.showGetData()
      break;
      case 'Utilisateur bloqué':
        this.onLoadUserDisabledList()
      break;
    }
  }


  deleteAccount(): void {
    this.isConfirmDeleteCurrentUserPopupOpen.emit(true);
  }

  updatePersonnalInformation() {
    this.isPersonnalInformationPopupOpen.emit(true);
  }

  onContactFormOpen() {
    this.isContactPopupFormOpen.emit(true);
  }

  onLoadUserReceivedMessageList() {
    this.isUserReceivedMessageListOpen.emit(true); 
  }

  onLoadHistoricMessageList() {
    this.isHistoricMessageListOpen.emit(true);
  }

  showGetData() {
    this.isGetDataOpen.emit(true);
  }

  onLoadUserDisabledList() {
    this.isUserDisabledListOpen.emit(true);
  }

}
