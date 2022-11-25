import {Action} from '@ngrx/store';
import {ErrorModel} from '../../../../shared/errors/error-model';

export const SET_ERROR = 'SET_ERROR';

export class SetError implements Action {
  readonly type = SET_ERROR;

  constructor(public payload: ErrorModel) {
  }
}

export type ErrorActions = SetError
