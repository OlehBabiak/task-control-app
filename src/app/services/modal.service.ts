import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {BoardColumnModel} from "../shared/board.column-model";
import {ColumnTaskModel} from "../shared/column.task-model";

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  boardIndex: string | null = null;
  column: BoardColumnModel;
  task: ColumnTaskModel

  constructor() {
  }

  private display: BehaviorSubject<
    'open' |
    'close' |
    'openTask' |
    'closeTask'> =
    new BehaviorSubject('close');

  watch(): Observable<'open' | 'close' | 'openTask' | 'closeTask'> {
    return this.display.asObservable();
  }

  open(index: string | null, openValue, column?: BoardColumnModel, task?: ColumnTaskModel) {
    this.column = column;
    this.task = task;
    this.boardIndex = index;
    this.display.next(openValue);
    console.log(column, task)
  }

  close(closeValue) {
    this.display.next(closeValue);
  }
}
