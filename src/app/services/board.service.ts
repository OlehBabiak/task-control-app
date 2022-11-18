import {Injectable} from '@angular/core';
import {Store} from "@ngrx/store";
import * as DashboardActions from "../components/dashboard/store/dashboard.actions";

import {BoardModel} from '../shared/board-model';
import {ColumnTaskModel} from '../shared/column.task-model';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  constructor(private store: Store<{ dashboardList: { boards: BoardModel[], board: BoardModel }, tasks: ColumnTaskModel[] }>) {
  }

  setBoards(boards: BoardModel[]) {
    this.store.dispatch(new DashboardActions.SetBoards(boards))
  }

  setBoard(board: BoardModel) {
    this.store.dispatch(new DashboardActions.SetBoard(board))
  }

  setTask(tasks: ColumnTaskModel[]) {
    this.store.dispatch(new DashboardActions.SetTasks(tasks))
  }
}
