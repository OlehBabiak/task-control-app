import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ErrorModel} from "../error-model";

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.scss']
})
export class ErrorPageComponent implements OnInit {

  @Input() error: ErrorModel
  @Output() newItemEvent = new EventEmitter<null>();

  constructor() { }

  ngOnInit(): void {
  }

  onHandleError() {
    this.newItemEvent.emit(null)
  }
}
