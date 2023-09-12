import { Component, EventEmitter, Output } from '@angular/core';
import { Menu } from 'src/app/models/menu.model';

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


  dropDownAccountMenuItems: Menu[] = [
    new Menu('Supprimer mon compte', ''),
    new Menu('Modifier mon numéro de téléphone', ''),
  ];

  dropDownMessageMenuItems: Menu[] = [
    new Menu('Envoyer une notification', ''),
    new Menu('Boite de reception', ''),
    new Menu('Historique des notifications', ''),
  ];



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
