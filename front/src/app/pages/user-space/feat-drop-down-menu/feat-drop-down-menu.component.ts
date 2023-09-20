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
  @Output() isUserMessageListOpen: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() isGetDataOpen: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() isUserDisabledListOpen: EventEmitter<boolean> = new EventEmitter<boolean>();

  dropDownAccountMenuItems: Menu[] = [
    new Menu('Supprimer mon compte', ''),
    new Menu('Modifier mon numéro de téléphone', ''),
  ];

  dropDownMessageMenuItems: Menu[] = [
    new Menu('Envoyer une notification', ''),
    new Menu('Boite de reception', ''),
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


  onDropdownAccountMenuItemClick(menuItem: Menu) {
    if (menuItem.label === 'Supprimer mon compte') {
      this.deleteAccount();
    } else if (menuItem.label === 'Modifier mon numéro de téléphone') {
      this.changePhoneNumber();
    }
  }

  onDropdownMessageMenuItemClick(menuItem: Menu) {
    if (menuItem.label === 'Envoyer une notification') {
      this.onContactFormOpen();
    }  else if (menuItem.label === 'Boite de reception') {  
      this.onLoadUserReceivedMessageList();
    }else if (menuItem.label === 'Historique des notifications') {
      this.onLoadUserMessageList();
    }
  }

   onDropdownUserMenuItemClick(menuItem: Menu) {
    if (menuItem.label === 'Rechercher un utilisateur') {
       this.showGetData();
    }  else if (menuItem.label === 'Utilisateur bloqué') {  
      this.onLoadUserDisabledList();
    }
  }

  showGetData() {
    this.isGetDataOpen.emit(true);
  }

  onLoadUserDisabledList() {
    this.isUserDisabledListOpen.emit(true);
  }

  deleteAccount(): void {
    this.isConfirmDeleteCurrentUserPopupOpen.emit(true);
  }

  changePhoneNumber(): void {
      
  }

  onContactFormOpen() {
    this.isContactPopupFormOpen.emit(true);
  }

  onLoadUserReceivedMessageList() {
    this.isUserReceivedMessageListOpen.emit(true);
  }

  onLoadUserMessageList() {
    this.isUserMessageListOpen.emit(true);
  }

}
