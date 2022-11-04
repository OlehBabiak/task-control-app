import {Injectable} from '@angular/core';
import {BoardModel} from '../shared/board-model';
import {Subject} from 'rxjs';
import {ColumnTaskModel} from '../shared/column.task-model';

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

  filterBoards(value: string) {
    this.filtered = this.boards.filter(board => board.name.search(value) !== -1)
    this.boardsChanged.next(this.filtered.slice())
  }

  sortBoards(value: string) {
    switch (value) {
      case 'ASC Name':
        this.filtered = this.boards.sort((a: BoardModel, b: BoardModel) => {
          if (a.name > b.name) {
            return 1
          }
          if (a.name < b.name) {
            return -1
          }
          return 0
        })
        this.boardsChanged.next(this.filtered.slice())
        break;
      case 'DESC Name':
        this.filtered = this.boards.sort((a: BoardModel, b: BoardModel) => {
          if (b.name > a.name) {
            return 1
          }
          if (b.name < a.name) {
            return -1
          }
          return 0
        })
        this.boardsChanged.next(this.filtered.slice())
        break;
      case 'ASC Create date':
        this.filtered = this.boards.sort((a: BoardModel, b: BoardModel) => {
          if (a.createdAt > b.createdAt) {
            return 1
          }
          if (a.createdAt < b.createdAt) {
            return -1
          }
          return 0
        })
        this.boardsChanged.next(this.filtered.slice())
        break;
      case 'DSC Create Date':
        this.filtered = this.boards.sort((a: BoardModel, b: BoardModel) => {
          if (b.createdAt > a.createdAt) {
            return 1
          }
          if (b.createdAt < a.createdAt) {
            return -1
          }
          return 0
        })
        this.boardsChanged.next(this.filtered.slice())
        break;
    }
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
