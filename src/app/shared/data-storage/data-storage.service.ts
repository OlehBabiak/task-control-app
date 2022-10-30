import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {BoardService} from "../../services/board.service";
import {BoardModel} from "../board-model";
import {pipe, Subject, tap, throwError} from "rxjs";

import {ColumnTaskModel} from "../column.task-model";
import {catchError} from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: HttpClient, private boardService: BoardService) {
  }

  errorSubj = new Subject<HttpErrorResponse>()

  storeBoard(board: BoardModel) {
    this.http
      .post<BoardModel[]>('http://localhost:8080/api/board',
        board)
      .subscribe({
        next: (res: BoardModel[]) => this.boardService.setBoards(res),
        error: (error) => this.errorSubj.next(error)
      })
  }


  deleteBoard(id: String) {
    this.http.delete<BoardModel[]>(`http://localhost:8080/api/board/${id}`)
      .subscribe(res => this.boardService.setBoards(res))
  }

  updateBoard(id: String, board: BoardModel) {
    this.http.put<BoardModel[]>(`http://localhost:8080/api/board/${id}`, board)
      .subscribe(res => this.boardService.setBoards(res))
  }

  getBoardById(id: String) {
    return this.http.get<BoardModel>(`http://localhost:8080/api/board/${id}`)
  }

  getBoards() {
    return this.http.get<BoardModel[]>('http://localhost:8080/api/board')
  }

  createColumn(id: String, name: string) {
    const body = {'boardID': id, 'name': name}
    this.http.post<BoardModel>('http://localhost:8080/api/columns', body)
      .subscribe(res => {
        this.boardService.setBoard(res)
      })
  }

  createTask(task: ColumnTaskModel) {
    this.http.post<BoardModel>('http://localhost:8080/api/tasks', task)
      .subscribe(res => {
        this.boardService.setBoard(res)
      })
  }

  updateTask(task: ColumnTaskModel) {
    this.http.put<BoardModel>('http://localhost:8080/api/tasks', task)
      .subscribe(res => {
        this.boardService.setBoard(res)
      })
  }
}
