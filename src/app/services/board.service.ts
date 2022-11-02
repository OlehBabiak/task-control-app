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
  private filtered: BoardModel[] = []
  private archiveTask: ColumnTaskModel[] = [];
  private activeBoard: BoardModel;

  constructor() {
  }

  filterBoards(value: string){
    this.filtered = this.boards.filter(board => board.name.search(value) !== -1)
    console.log(this.boards)
    this.boardsChanged.next(this.filtered.slice())
  }

  setBoards(boards: BoardModel[]) {
    this.boards = boards
    this.boardsChanged.next(this.boards.slice())
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
