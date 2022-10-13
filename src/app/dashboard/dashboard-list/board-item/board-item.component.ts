import {Component, Input, OnInit} from '@angular/core';
import {BoardModel} from "../../board-model";

@Component({
  selector: 'app-board-item',
  templateUrl: './board-item.component.html',
  styleUrls: ['./board-item.component.scss']
})
export class BoardItemComponent implements OnInit {
  @Input() board: BoardModel;
  @Input() index: number;
  descriptionLimitLength: string = '20';
  spanText: string = 'see more...'
  fullMode = false

  constructor() {
  }

  ngOnInit(): void {

  }

  onShowMoreContent($event) {
    $event.stopPropagation()
    if(this.descriptionLimitLength === '20'){
      this.descriptionLimitLength = '1000';
      this.fullMode = true;
      this.spanText = 'see less...'
    } else {
      this.descriptionLimitLength = '20';
      this.fullMode = false;
      this.spanText = 'see more...'
    }
  }
}
