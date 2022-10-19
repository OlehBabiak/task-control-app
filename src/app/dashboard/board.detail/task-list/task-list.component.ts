import {Component, Input, OnInit} from '@angular/core';
import {ColumnTaskModel} from "../../../shared/column.task-model";

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  @Input() tasks: ColumnTaskModel[];
  @Input() name: string

  constructor() {
  }

  ngOnInit(): void {
  }

}
