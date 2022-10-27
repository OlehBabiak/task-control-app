import {Component, Input, OnInit} from '@angular/core';
import {ColumnTaskModel} from "../../../shared/column.task-model";
import {BoardColumnModel} from "../../../shared/board.column-model";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  @Input() tasks: ColumnTaskModel[];
  @Input() column: BoardColumnModel
  columnTasksArr: ColumnTaskModel[]

  constructor() {
  }

  ngOnInit(): void {
    this.columnTasksArr = this.createTaskArr(this.column.tasks)
  }

  private createTaskArr (arr) {
    return arr.reduce((newArr:string[], cur: ColumnTaskModel): any => {
      if(cur.name){
        newArr.push(cur.name);
      }
      return newArr;
    }, [])
  }

  drop(event: CdkDragDrop<any, any>) {
    console.log(event.previousContainer, event.container)
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}
