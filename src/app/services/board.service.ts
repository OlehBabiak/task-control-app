import {Injectable} from '@angular/core';
import {BoardModel} from "../shared/board-model";
import {Subject} from "rxjs";
import {BoardColumnModel} from "../shared/board.column-model";
import {ColumnTaskModel} from "../shared/column.task-model";
import {TaskCommentModel} from "../shared/task.comment-model";
import {DataStorageService} from "../shared/data-storage/data-storage.service";

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  boardsChanged = new Subject<BoardModel[]>();
  boardChanged = new Subject<BoardModel>()

  private boards: BoardModel[] = [];
  private activeBoard: BoardModel;

  // private boards: BoardModel[] = [
  //   new BoardModel("Test board 1", "Test 1 description", new Date(11 / 5 / 2022), []),
  //   ////////////////////////////////////////
  //   new BoardModel("Test board 2", "Test 2 description ", new Date(11 / 5 / 2022), [
  //     new BoardColumnModel('Todo', []),
  //
  //     new BoardColumnModel('In Progress', [
  //       new ColumnTaskModel('Some task 1', 'In Progress', new Date(11 / 5 / 2022), 'Detail description of task1',
  //         [
  //           new TaskCommentModel('First comment of task1'),
  //           new TaskCommentModel('Second comment of task1'),
  //         ]),
  //       new ColumnTaskModel('Some task 2', 'In Progress', new Date(11 / 5 / 2022), 'Detail description of task2',
  //         [
  //           new TaskCommentModel('First comment of task2'),
  //           new TaskCommentModel('Second comment of task2'),
  //         ])
  //     ]),
  //
  //     new BoardColumnModel('Done', []),
  //   ]),
  //   ///////////////////////////////////////
  //   new BoardModel("Test board 3", "Test 3 description", new Date(11 / 5 / 2022), []),
  // ]

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


  addTask(id: string, form: ColumnTaskModel, status: string) {
    // const newTask = new ColumnTaskModel(form.name, status);
    // this.boards[id].columns.find(col => col.name === status).tasks.push(newTask)
    // this.boardsChanged.next(this.boards.slice());
  }

  updateTask(task) {
    console.log(task)
  }

  deleteTask() {

  }
}
