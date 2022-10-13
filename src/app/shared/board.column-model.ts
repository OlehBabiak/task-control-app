import {ColumnTaskModel} from "./column.task-model";

export class BoardColumnModel {
  constructor(public name: string, public tasks: ColumnTaskModel[]) {
  }
}
