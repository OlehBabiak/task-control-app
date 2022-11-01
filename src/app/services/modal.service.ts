import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {BoardColumnModel} from "../shared/board.column-model";
import {ColumnTaskModel} from "../shared/column.task-model";
import {BoardModel} from "../shared/board-model";

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  boardIndex: string | null = null;
  column: BoardColumnModel;

  taskSubj = new Subject<ColumnTaskModel>()

  constructor() {
  }

  private display: BehaviorSubject<'open' |
    'close' |
    'openTask' |
    'closeTask'> =
    new BehaviorSubject('close');

  watch(): Observable<'open' | 'close' | 'openTask' | 'closeTask'> {
    return this.display.asObservable();
  }

  open(index: string | null, openValue, column?: BoardColumnModel, task?: ColumnTaskModel) {
    this.column = column;
    this.taskSubj.next(task)
    this.boardIndex = index;
    this.display.next(openValue);
  }

  close(closeValue) {
    this.display.next(closeValue);
  }
}
