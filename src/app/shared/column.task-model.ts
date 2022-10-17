import {TaskCommentModel} from "./task.comment-model";

export class ColumnTaskModel {
  constructor(
    public name: string,
    public status: string,
    public creationDate: Date,
    public description?: string,
    public comments?: TaskCommentModel[],
    ) {
  }
}
