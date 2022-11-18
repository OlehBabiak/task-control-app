import * as DashboardActions from "./dashboard.actions";
import {BoardModel} from "../../../shared/board-model";

const initialState = {
  boards: [],
  board: BoardModel,
  tasks: []
}

export function dashboardReducer(
  state = initialState,
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
