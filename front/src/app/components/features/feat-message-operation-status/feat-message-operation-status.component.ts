import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-feat-message-operation-status',
  templateUrl: './feat-message-operation-status.component.html',
  styleUrls: ['./feat-message-operation-status.component.scss']
})
export class FeatMessageOperationStatusComponent {

  @Input() isNotificationSended: boolean = false;
  @Input() isNotificationSendedError: boolean = false;

  @Input() isMessageReplySended: boolean = false;
  @Input() isMessageReplySendedError: boolean = false;
}
