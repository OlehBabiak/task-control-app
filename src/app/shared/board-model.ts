import {BoardColumnModel} from './board.column-model';

export class BoardModel {
  constructor(public _id: string, public name: string, public description: string, public createdAt: Date, public updatedAt: Date, public columns?: BoardColumnModel[]) {
  }
}
