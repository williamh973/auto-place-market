import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-feat-contact-popup',
  templateUrl: './feat-contact-popup.component.html',
  styleUrls: ['./feat-contact-popup.component.scss']
})
export class FeatContactPopupComponent {

  @Output() onCloseContactPopupFormEmit: EventEmitter<boolean> = new EventEmitter<boolean>();

  isContactPopupFormOpen: boolean = false;

  onCancelContactPopupForm() {
    this.onCloseContactPopupFormEmit.emit(this.isContactPopupFormOpen); 
  }
}
