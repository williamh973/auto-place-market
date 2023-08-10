import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-feat-card-operation-status',
  templateUrl: './feat-card-operation-status.component.html',
  styleUrls: ['./feat-card-operation-status.component.scss']
})
export class FeatCardOperationStatusComponent {

  
  @Input() isCardCreated: boolean = false;
  @Input() isCardCreatedError: boolean = false;

  @Input() isCardUpdated: boolean = false;
  @Input() isCardUpdatedError: boolean = false;
  
  @Input() isCardDeleted: boolean = false;
  @Input() isCardDeletedError: boolean = false;
  
  @Input() isCardFavoriteAdded: boolean = false;
  @Input() isCardFavoriteAddedError: boolean = false;
  
  @Input() isCardFavoriteDelete: boolean = false;
  @Input() isCarFavoritedDeleteError: boolean = false;


}
