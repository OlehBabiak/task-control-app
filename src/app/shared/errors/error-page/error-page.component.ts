import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ErrorModel} from '../error-model';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.scss']
})
export class ErrorPageComponent {

  @Input() error: ErrorModel
  @Output() close = new EventEmitter<null>();

  onClose() {
    this.close.emit(null)
  }
}
