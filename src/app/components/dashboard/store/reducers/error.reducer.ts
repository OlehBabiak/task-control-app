import * as ErrorActions from '../actions/error.actions';
import {ErrorModel} from '../../../../shared/errors/error-model';

export interface State {
  error: ErrorModel
}

export interface ErrorState {
  errorItem: State;
}

const initialState: State = {
  error: null,
}

export function errorReducer(
  state: State = initialState,
  action: ErrorActions.ErrorActions): State {
  switch (action.type) {
    case ErrorActions.SET_ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
}
