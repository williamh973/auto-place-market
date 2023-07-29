import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Card } from 'src/app/models/card.model';
import { User } from 'src/app/models/user.model';
import { CardService } from 'src/app/shared/services/card.service';
import { PhotoService } from 'src/app/shared/services/photo-service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize, switchMap } from 'rxjs/operators';
import { Picture } from 'src/app/models/picture.model';
import { PictureService } from 'src/app/shared/services/picture.service';
import { forkJoin, of } from 'rxjs';


@Component({
  selector: 'app-step2',
  templateUrl: './step2.component.html',
  styleUrls: ['./step2.component.scss']
})
export class Step2Component {

  @Input() currentStep!: number

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
    [], 
    'ROLE_USER'
    )
);

@Input() 
picture:  Picture = new Picture(
  '',
  0, 
  );


@Input() 
createMode: boolean = false;

@Output() 
isCardEditFormToggle: EventEmitter<boolean> = new EventEmitter<boolean>();
 
@Output() 
isFormCreateCard: EventEmitter<boolean> = new EventEmitter<boolean>();

@Output() 
forGoToStep1: EventEmitter<void> = new EventEmitter<void>();

@Output() 
onCloseAllStepsFormEmit: EventEmitter<boolean> = new EventEmitter<boolean>();
 
  isPhotoInTheBox: boolean = false;
  photosList: File[] = [];


  constructor(
    private cardService: CardService,
    private photoService: PhotoService,
    private storage: AngularFireStorage,
    private pictureService: PictureService
    ) {}

    ngOnInit(): void {
      this.photosList = this.photoService.photosList;
      console.log(this.card);
      
    }


onCancelAllStepsForms() {
  this.onCloseAllStepsFormEmit.emit();
}

 
onSubmit() {
    if (this.createMode) {
        this.cardService.createCard(this.card).pipe(
          switchMap((createdCard: Card) => {
            this.card.id = createdCard.id; 
  
            const uploadObservables = this.photoService.photosList.map((photo: File) => {
              const filePath = `car/${new Date().getTime()}_${photo.name}.png`;
              const fileRef = this.storage.ref(filePath);
              return this.storage.upload(filePath, photo).snapshotChanges();
            });
            return forkJoin(uploadObservables);
          })
        ).subscribe((uploadSnapshots: any[]) => {
       
          const downloadUrlsObservables = uploadSnapshots.map((snapshot: any) => snapshot.ref.getDownloadURL());
          forkJoin(downloadUrlsObservables).subscribe((downloadUrls: string[]) => {
            this.card.picturesList = downloadUrls.map((url: string) => new Picture(url));
           
            this.cardService.updateCard(this.card).subscribe(() => {
            });
          });
        });
        window.location.reload();
  } else {
    this.cardService.updateCard(this.card).subscribe((createdCard) => {
      window.location.reload();
    });
  }

}


isSubmitting: boolean = false;

onSelect(event: any) {
  this.isPhotoInTheBox = true;
  this.photoService.photosList.push(...event.addedFiles);
  for (let file of event.addedFiles) {
    const filePath = `car/${new Date().getTime()}_${file.name}.png`;
    const fileRef = this.storage.ref(filePath);
    this.storage.upload(filePath, file)
      .snapshotChanges()
      .pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(url => {
            this.card.image = url;
          });
        })
      )
      .subscribe();
  }
}



  onRemove(event: any) {
    const removedIndex = this.photosList.indexOf(event);
    if (removedIndex > -1) {
      this.photoService.photosList.splice(removedIndex, 1);
      this.card.image = '';
    }
  }

  onGoToStep1() {
    this.forGoToStep1.emit();
  }

}
