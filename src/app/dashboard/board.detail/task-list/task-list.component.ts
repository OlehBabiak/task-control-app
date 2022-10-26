import {Component, Input, OnInit} from '@angular/core';
import {ColumnTaskModel} from "../../../shared/column.task-model";
import {BoardColumnModel} from "../../../shared/board.column-model";

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  @Input() tasks: ColumnTaskModel[];
  @Input() column: BoardColumnModel

  constructor() {
  }

  ngOnInit(): void {

  }

}
