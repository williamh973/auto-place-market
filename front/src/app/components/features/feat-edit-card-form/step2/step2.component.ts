import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Card } from 'src/app/models/card.model';
import { User } from 'src/app/models/user.model';
import { CardService } from 'src/app/shared/services/card.service';
import { PhotoService } from 'src/app/shared/services/photo-service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';
import { Picture } from 'src/app/models/picture.model';
import { PictureService } from 'src/app/shared/services/picture.service';
import { Observable, forkJoin } from 'rxjs';



@Component({
  selector: 'app-step2',
  templateUrl: './step2.component.html',
  styleUrls: ['./step2.component.scss']
})


export class Step2Component {

@Input() card:  Card = new Card('', '', '', 0, 0, 0, '', '', 0, new Date(), [], new User('', '', '', '', [], [], [], 'ROLE_USER'));
@Input() currentStep!: number
@Input() createMode: boolean = false;

@Output() isCardEditFormToggle: EventEmitter<boolean> = new EventEmitter<boolean>();
@Output() isFormCreateCard: EventEmitter<boolean> = new EventEmitter<boolean>();
@Output() forGoToStep1: EventEmitter<void> = new EventEmitter<void>();
@Output() onCloseAllStepsFormEmit: EventEmitter<boolean> = new EventEmitter<boolean>();
 
picture: Picture = new Picture('', new Card('','', '', 0, 0, 0, '', '', 0, new Date(), [], new User('', '', '', '', [], [], [], 'ROLE_USER')));

isPhotoInTheBox: boolean = false;
isDropZoneOnCreateMode: boolean = false;
isLoadingComposantActive: boolean = false;
isCardCreated: boolean = false;
isCardCreatedError: boolean = false;
isCardUpdated: boolean = false;
isCardUpdatedError: boolean = false;

photosList: File[] = [];


constructor(
  private cardService: CardService,
  private photoService: PhotoService,
  private storage: AngularFireStorage,
  private pictureService: PictureService,
  ) {}


  ngOnInit(): void {
    this.photosList = this.photoService.photosList;   
  }

  onCancelAllStepsForms() {
    this.onCloseAllStepsFormEmit.emit();
  }
  
  onHandlePhotoUpload(event: any) {
    this.isPhotoInTheBox = true;
    this.photoService.photosList.push(...event.addedFiles);
  }

  onRemovePhotoOfPhotoList(event: any) {
    const removedIndex = this.photosList.indexOf(event);
    if (removedIndex > -1) {
      this.photoService.photosList.splice(removedIndex, 1);
    }
  }
  
  onGoToStep1() {
    this.forGoToStep1.emit();
  }
  
  onDeletePictureOfCardPicturesList(picture: Picture) {
    this.pictureService.deletePicture(picture.id as number).subscribe(() => {
      const index = this.card.picturesList.findIndex(p => p.id === picture.id);
      if (index !== -1) {
        this.card.picturesList.splice(index, 1);
      }
    });
  }

  onSubmit() {
    if (this.createMode) {
      this.isLoadingComposantActive = true;
      this.createCard()
    } else {
      this.isLoadingComposantActive = true;
      this.updateCard()
    }
  }

  private createCard() {
      this.cardService.createCard(this.card).subscribe((createdCard) => {
        const uploadObservables: Observable<Picture | null>[] = [];
    
        for (let file of this.photoService.photosList) {
          const filePath = `car/${new Date().getTime()}_${file.name}.png`;
          const fileRef = this.storage.ref(filePath);
  
          const uploadObservable = new Observable<Picture | null>((observer) => {
            const task = this.storage.upload(filePath, file);
            task.snapshotChanges().pipe(
              finalize(() => {
                fileRef.getDownloadURL().subscribe(
                  (url) => {
                    if (createdCard.id) {
                      const newPicture: Picture = new Picture(url, createdCard);
                      this.pictureService.addPicture(newPicture).subscribe(
                        (savedPicture) => {
                          observer.next(savedPicture);
                          observer.complete();
                        },
                        (error) => {
                          observer.next(null);
                          observer.complete();
                        }
                      );
                    } else {
                      observer.next(null);
                      observer.complete();
                    }
                  }
                );
              })
            ).subscribe();
          });
          uploadObservables.push(uploadObservable);
        }
  
        forkJoin(uploadObservables).subscribe(
          (results) => {
            this.isLoadingComposantActive = false;
            this.isCardCreated = true; 
            setTimeout(() => {
              this.isCardCreated = false;
              window.location.reload();
            }, 1000);
          },
          (error) => {
            this.isLoadingComposantActive = false;
            this.isCardCreatedError = true;
            setTimeout(() => {
              this.isCardCreatedError = false;
            }, 1000);
          }
        );
      }
    );

  }

  private updateCard() {
    const uploadObservables: Observable<Picture | null>[] = [];
  
    if (this.photoService.photosList.length > 0) {
    for (let file of this.photoService.photosList) {
      const filePath = `car/${new Date().getTime()}_${file.name}.png`;
      const fileRef = this.storage.ref(filePath);
  
      const uploadObservable = new Observable<Picture | null>((observer) => {
        this.storage.upload(filePath, file)
          .snapshotChanges()
          .pipe(
            finalize(() => {
              fileRef.getDownloadURL().subscribe(url => {
                const newPicture: Picture = new Picture(url, this.card);
                this.pictureService.addPicture(newPicture).subscribe(savedPicture => {
                  observer.next(savedPicture);
                  observer.complete();
                });
              });
            })
          )
          .subscribe();
      });
  
      uploadObservables.push(uploadObservable);
    }
  
    forkJoin(uploadObservables).subscribe(
      (results) => {
        this.cardService.updateCard(this.card).subscribe((updatedCard) => {
          const updateObservables: Observable<Picture>[] = [];
  
          for (let picture of updatedCard.picturesList) {
            const updatedPicture = new Picture(picture.src, updatedCard, picture.id);
            updateObservables.push(this.pictureService.updatePicture(updatedPicture));
          }
  
          forkJoin(updateObservables).subscribe(
            (updatedPictures) => {
              this.isLoadingComposantActive = false;
              this.isCardUpdated = true; 
              setTimeout(() => {
                this.isCardUpdated = false;
                window.location.reload();
              }, 1000);
            },
            (error) => {
              this.isLoadingComposantActive = false;
              this.isCardUpdatedError = true; 
              setTimeout(() => {
                this.isCardUpdatedError = false;
                window.location.reload();
              }, 1000);
            }
          );
        });
      },
      (error) => {
        this.isLoadingComposantActive = false;
      }
    );
   } else {
     this.isLoadingComposantActive = false;
   }
 }

 areAllFieldsFilled() {
   return this.photoService.photosList.length > 0;
}
  
}