import {Component, Input, OnInit} from '@angular/core';
import {ErrorModel} from "../error-model";

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.scss']
})
export class ErrorPageComponent implements OnInit {

  @Input() error: ErrorModel

  constructor() { }

  ngOnInit(): void {
  }

}
