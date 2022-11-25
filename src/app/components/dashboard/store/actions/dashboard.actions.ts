import {Action} from "@ngrx/store";
import {BoardModel} from "../../../../shared/board-model";
import {ColumnTaskModel} from "../../../../shared/column.task-model";

export const SET_BOARDS = 'SET_BOARDS';
export const SET_BOARD = 'SET_BOARD';
export const SET_TASKS = 'SET_TASKS';

export class SetBoards implements Action {
  readonly type = SET_BOARDS;

  constructor(public payload: BoardModel[]) {
  }
}

export class SetBoard implements Action {
  readonly type = SET_BOARD;

  constructor(public payload: BoardModel) {
  }
}

export class SetTasks implements Action {
  readonly type = SET_TASKS;

  constructor(public payload: ColumnTaskModel[]) {
  }
}


export type DashboardActions = SetBoards | SetBoard | SetTasks
