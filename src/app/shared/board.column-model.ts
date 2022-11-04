import {ColumnTaskModel} from './column.task-model';

export class BoardColumnModel {
  constructor(
    public id: string,
    public boardID: string,
    public name: string,
    public tasks?: ColumnTaskModel[]) {
  }
}
