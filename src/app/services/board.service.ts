import {Injectable} from '@angular/core';
import {BoardModel} from "../shared/board-model";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  boardsChanged = new Subject<BoardModel[]>();
  boardChanged = new Subject<BoardModel>()

  private boards: BoardModel[] = [];
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
    console.log(board)
    this.activeBoard = board
    return this.boardChanged.next(this.activeBoard)
  }
}
