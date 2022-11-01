import {Injectable} from '@angular/core';
import {BoardModel} from "../shared/board-model";
import {Subject} from "rxjs";
import {ColumnTaskModel} from "../shared/column.task-model";

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  boardsChanged = new Subject<BoardModel[]>();
  boardChanged = new Subject<BoardModel>()
  tasksChanged = new Subject<ColumnTaskModel[]>()

  private boards: BoardModel[] = [];
  private archiveTask: ColumnTaskModel[] = [];
  private activeBoard: BoardModel;

  constructor() {
  }

  setBoards(boards: BoardModel[]) {
    this.boards = boards
    this.boardsChanged.next(this.boards.slice())
  }

  getBoards() {
    return this.boards.slice()
  }

  setBoard(board: BoardModel) {
    this.activeBoard = board
    return this.boardChanged.next(this.activeBoard)
  }

  setTask(tasks: ColumnTaskModel[]) {
    this.archiveTask = tasks
    return this.tasksChanged.next(this.archiveTask)
  }
}
