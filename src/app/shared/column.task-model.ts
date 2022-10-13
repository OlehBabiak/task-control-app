import {TaskCommentModel} from "./task.comment-model";

export class ColumnTaskModel {
  constructor(public name: string, public description: string, public comments: TaskCommentModel[]) {
  }
}
