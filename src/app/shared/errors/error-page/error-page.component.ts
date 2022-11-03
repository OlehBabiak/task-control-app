import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ErrorModel} from "../error-model";

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.scss']
})
export class ErrorPageComponent {

  @Input() error: ErrorModel
  @Output() newItemEvent = new EventEmitter<null>();

  onHandleError() {
    this.newItemEvent.emit(null)
  }
}
