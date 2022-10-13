import {Injectable} from '@angular/core';
import {BoardModel} from "../dashboard/board-model";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  boardChanged = new Subject<BoardModel[]>()

  private boards: BoardModel[] = [
    new BoardModel("Test board 1", "Test 1 description", new Date(11/5/2022), []),
    new BoardModel("Test board 2", "Test 2 description kkdlkdf lfgldkfglkd ldfk glkfdmg lkdfm lkfmgldkfmglekrgmfmvdfk gdflkmgldfkgldkbnlkfbndf bdfknbldfkbnd lbdlkbnd fbkldnbldkbnldkfbn fkldnkfklfbldb ", new Date(11/5/2022), []),
    new BoardModel("Test board 3", "Test 3 description", new Date(11/5/2022), []),
  ]

  constructor() {
  }

  getBoards() {
    return this.boards.slice()
  }

  getBoard(id: number) {
    return this.boards[id]
  }

  createBoard(board: BoardModel) {
    const newBoard = new BoardModel(board.name, board.description);
    console.log(board)
    this.boards.push(newBoard)
    this.boardChanged.next(this.boards.slice())
  }
}
