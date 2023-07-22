import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Card } from 'src/app/models/card.model';
import { User } from 'src/app/models/user.model';
import { Picture } from 'src/app/models/picture.model';
import { AccountPopupService } from 'src/app/shared/services/account-popup.service';

@Component({
  selector: 'app-feat-edit-card-form',
  templateUrl: './feat-edit-card-form.component.html',
  styleUrls: ['./feat-edit-card-form.component.scss']
})
export class FeatEditCardFormComponent {


@Input() 
card:  Card = new Card(
  '',
  '', 
  '', 
  0, 
  0, 
  0, 
  '', 
  '', 
  0,
  [],
  new User(
    '', 
    '', 
    '', 
    '', 
    [], 
    'ROLE_USER'
    )
);

@Input() 
picture: Picture = new Picture('', 0);

@Input() 
createMode: boolean = false;

@Output() 
onCloseEditCardFormEmit: EventEmitter<boolean> = new EventEmitter<boolean>();


currentStep: number = 1;
isStepsFormsOpen: boolean = true;




  onRecevedMethodForGoToStep2() {
    this.currentStep = 2;
  }

  onRecevedMethodForGoToStep1() {
    this.currentStep = 1;
  }

  onRecevedMethodForCloseAllSteps(isStepsFormsOpen: boolean) {
    this.isStepsFormsOpen = isStepsFormsOpen;
    this.onCloseEditCardFormEmit.emit();
  }

}




// constructor(
//   private cardService: CardService,
//   private pictureService: PictureService
//   ) {}



  // onSubmit() {
  //   if (this.createMode) {
  //       this.cardService.createCard(this.card).subscribe();
  //       this.pictureService.createPicture(this.picture).subscribe();
  //       this.isFormCreateCard.emit(false);
  //       window.location.reload();
  // } else {
  //     this.cardService.updateCard(this.card).subscribe();
  //     this.isCardEditFormToggle.emit(false);
  //     window.location.reload();
  //   } 
  // } 




// cancelPopup() {
//   this.isCardEditFormToggle.emit(false);
//   this.isFormCreateCard.emit(false);
//  }


  // isPhotoInTheBox: boolean = false;
  // photosList: File[] = [];



    // ngOnInit(): void {
    //   this.photosList = this.photoService.photosList;
    // }



  // onSelect(event: any) {
  //   this.isPhotoInTheBox = true;
  //   this.photoService.photosList.push(...event.addedFiles);

  //   for (let file of event.addedFiles) {
  //     const filePath = `car/${new Date().getTime()}_${file.name}.png`;
  //     const fileRef = this.storage.ref(filePath);
  //     this.storage.upload(filePath, file)
  //       .snapshotChanges()
  //       .pipe(
  //         finalize(() => {
  //           fileRef.getDownloadURL().subscribe((url) => {
  //             this.card.image = url;
  //           });
  //         })  
  //       )
  //       .subscribe();
  //   }
  // }



  // onSelect(event: any) {
  //   this.isPhotoInTheBox = true;
  //   this.photoService.photosList.push(...event.addedFiles);

  //   for (let file of event.addedFiles) {
  //     const filePath = `car/${new Date().getTime()}_${file.name}.png`;
  //     const fileRef = this.storage.ref(filePath);
  //     this.storage.upload(filePath, file)
  //       .snapshotChanges()
  //       .pipe(
  //         finalize(() => {
  //           fileRef.getDownloadURL().subscribe(photoUrl => {
  //             this.card.image = photoUrl;
  //             this.card.picturesList.push(photoUrl)
  //           });
  //         })  
  //       )
  //       .subscribe();
  //   }
  // }



  // onRemove(event: any) {
  //   const removedIndex = this.photosList.indexOf(event);
  //   if (removedIndex > -1) {
  //     this.photoService.photosList.splice(removedIndex, 1);
  //     this.card.image = '';
  //   }
  // }



