import {TaskCommentModel} from './task.comment-model';

export class ColumnTaskModel {
  constructor(
    public boardID: string,
    public name: string,
    public status: string,
    public description?: string,
    public _id?: string,
    public comments?: TaskCommentModel[],
    public createdAt?: Date,
    public updatedAt?: Date
    ) {
  }
}
