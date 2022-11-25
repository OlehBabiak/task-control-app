import * as DashboardActions from '../actions/dashboard.actions';
import {BoardModel} from '../../../../shared/board-model';
import {ColumnTaskModel} from '../../../../shared/column.task-model';


export interface State {
  boards: BoardModel[];
  board: BoardModel;
  tasks: ColumnTaskModel[];
  task: ColumnTaskModel;
}

export interface BoardState {
  dashboardList: State;
}

const initialState: State = {
  boards: [],
  board: null,
  tasks: [],
  task: null
}

export function dashboardReducer(
  state: State = initialState,
  action: DashboardActions.DashboardActions) {
  switch (action.type) {
    case DashboardActions.SET_BOARDS:
      return {
        ...state,
        boards: [...action.payload]
      };
    case DashboardActions.SET_BOARD:
      return {
        ...state,
        board: action.payload
      };
    case DashboardActions.SET_TASKS:
      return {
        ...state,
        tasks: action.payload
      };
    default:
      return state;
  }
}
