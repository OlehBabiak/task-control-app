import {BoardColumnModel} from "../shared/board.column-model";

export class BoardModel {
  constructor(public name: string, public description: string, public creatingDate?: Date, public columns?: BoardColumnModel[]) {
  }
}
