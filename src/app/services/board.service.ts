import {Injectable} from '@angular/core';
import {BoardModel} from "../dashboard/board-model";
import {Subject} from "rxjs";
import {BoardColumnModel} from "../shared/board.column-model";
import {ColumnTaskModel} from "../shared/column.task-model";
import {TaskCommentModel} from "../shared/task.comment-model";

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  boardChanged = new Subject<BoardModel[]>()

  private boards: BoardModel[] = [
    new BoardModel("Test board 1", "Test 1 description", new Date(11 / 5 / 2022), []),
    ////////////////////////////////////////
    new BoardModel("Test board 2", "Test 2 description ", new Date(11 / 5 / 2022), [
      new BoardColumnModel('Todo', []),

      new BoardColumnModel('In Progress', [
        new ColumnTaskModel('Some task 1', 'In Progress', new Date(11 / 5 / 2022), 'Detail description of task1',
          [
            new TaskCommentModel('First comment of task1'),
            new TaskCommentModel('Second comment of task1'),
          ]),
        new ColumnTaskModel('Some task 2', 'In Progress', new Date(11 / 5 / 2022), 'Detail description of task2',
          [
            new TaskCommentModel('First comment of task2'),
            new TaskCommentModel('Second comment of task2'),
          ])
      ]),

      new BoardColumnModel('Done', []),
    ]),
    ///////////////////////////////////////
    new BoardModel("Test board 3", "Test 3 description", new Date(11 / 5 / 2022), []),
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
    const newBoard = new BoardModel(board.name, board.description, new Date, []);
    this.boards.push(newBoard);
    this.boardChanged.next(this.boards.slice())
  }

  editBoard(id: number, newBoard: BoardModel) {
    this.boards[id] = new BoardModel(newBoard.name, newBoard.description);
    this.boardChanged.next(this.boards.slice())
  }

  deleteBoard(id: number) {
    this.boards.splice(id, 1);
    this.boardChanged.next(this.boards.slice())
  }

  addBoardColumn(id: number, columnName) {
    const mewColumn = new BoardColumnModel(columnName.column, [])
    this.boards[id].columns.push(mewColumn);
    this.boardChanged.next(this.boards.slice())
  }

  addTask(id: number, name: string, status: string) {
    const newTask = new ColumnTaskModel(name, status);
    this.boards[id].columns.find(col => col.name === status).tasks.push(newTask)
    this.boardChanged.next(this.boards.slice());
  }

  editTask(){

  }

  deleteTask(){

  }
}
