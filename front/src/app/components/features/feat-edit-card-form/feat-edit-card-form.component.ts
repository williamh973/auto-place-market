import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Card } from 'src/app/models/card.model';
import { User } from 'src/app/models/user.model';
import { CardService } from 'src/app/shared/services/card.service';
import { PhotoService } from 'src/app/shared/services/photo-service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-feat-edit-card-form',
  templateUrl: './feat-edit-card-form.component.html',
  styleUrls: ['./feat-edit-card-form.component.scss']
})
export class FeatEditCardFormComponent {


@Input()
 card: Card = new Card(
  [],
  "", 
  "", 
  "", 
  0, 
  0 , 
  0 , 
  "" , 
  "",
  0 ,
  new User(
    "", 
    "", 
    "", 
    "", 
    [], 
    "ROLE_USER"
    )
  ) 

@Input() 
createMode: boolean = false;

@Output() 
isCardEditFormToggle: EventEmitter<boolean> = new EventEmitter<boolean>();
 
@Output() 
isFormCreateCard: EventEmitter<boolean> = new EventEmitter<boolean>();
 
  photos: File[] = [];
  photosURL: string[] = [];
  isPhotoInTheBox: boolean = false;


  constructor(
    private cardService: CardService,
    private photoService: PhotoService,
    private storage: AngularFireStorage
    ) {}

    ngOnInit(): void {
      this.photos = this.photoService.photos;
    }

   
 cancelPopup() {
  this.isCardEditFormToggle.emit(false);
  this.isFormCreateCard.emit(false);
 }

  onSubmit() {
    if (this.createMode) {
      this.cardService.createCard(this.card).subscribe((createCardFromDatabase: Card) => {
        this.isFormCreateCard.emit(false);
        window.location.reload();
      });
    } else {
      this.cardService.updateCard(this.card).subscribe((updateCardFromDatabase: Card) => {
        this.isCardEditFormToggle.emit(false);
        window.location.reload();
      }) 
    }
  }

  // onSelect(event: any) {}

  onSelect(event: any) {
    this.isPhotoInTheBox = true;
    this.photoService.photos.push(...event.addedFiles);
    for (let file of event.addedFiles) {
      const filePath = `car/${new Date().getTime()}_${file.name}`;
      const fileRef = this.storage.ref(filePath);
      this.storage.upload(filePath, file)
        .snapshotChanges()
        .pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe(url => {
              this.photosURL.push(url);
              this.card.pictures.push({ src: url });
            });
          })
        )
        .subscribe();
    }
  }

  // onRemove(event: any) {}
  
  onRemove(event: any) {
    const removedIndex = this.photos.indexOf(event);
    if (removedIndex > -1) {
      this.photos.splice(removedIndex, 1);
      this.photoService.photos.splice(removedIndex, 1);
      this.photosURL.splice(removedIndex, 1);
      this.card.pictures.splice(removedIndex, 1);
    }
  }
}
