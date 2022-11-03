import {Component, Input, OnInit} from '@angular/core';
import {ColumnTaskModel} from "../../../shared/column.task-model";
import {BoardColumnModel} from "../../../shared/board.column-model";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {DataStorageService} from "../../../shared/data-storage/data-storage.service";
import {BoardModel} from "../../../shared/board-model";
import {BoardService} from "../../../services/board.service";

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  @Input() tasks: ColumnTaskModel[];
  @Input() column: BoardColumnModel
  columnTasksArr: ColumnTaskModel[]

  constructor(private dataStorage: DataStorageService, private boardService: BoardService,) {
  }

  ngOnInit(): void {
    this.columnTasksArr = this.tasks
  }

  drop(event: CdkDragDrop<any, any>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      const dragEl: ColumnTaskModel = event.item.data;
      dragEl.status = event.container.element.nativeElement.classList[1]
      const updatedTask = new ColumnTaskModel(dragEl.boardID, dragEl.name, dragEl.status, dragEl.description, dragEl._id, dragEl.comments)
      this.dataStorage.updateTask(updatedTask)
        .subscribe({
          next: (res: BoardModel) => this.boardService.setBoard(res),
          error: (err) => {
            this.dataStorage.errorSubj.next(err)
          }
        })
    }
  }
}
