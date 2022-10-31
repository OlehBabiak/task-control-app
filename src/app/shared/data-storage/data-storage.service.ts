import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {BoardService} from "../../services/board.service";
import {BoardModel} from "../board-model";
import {pipe, Subject, tap, throwError} from "rxjs";

import {ColumnTaskModel} from "../column.task-model";
import {catchError} from "rxjs/operators";
import {ErrorService} from "../errors/error.service";
import {ErrorModel} from "../errors/error-model";


@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: HttpClient, private boardService: BoardService, private errorService: ErrorService) {
  }

  errorSubj = new Subject<ErrorModel>()

  storeBoard(board: BoardModel) {
    return this.http
      .post<BoardModel[]>('http://localhost:8080/api/board',
        board)
      .pipe(
        catchError(this.errorService.handleError)
      )
  }


  deleteBoard(id: String) {
    return this.http.delete<BoardModel[]>(`http://localhost:8080/api/board/${id}`)
      .pipe(
        catchError(this.errorService.handleError)
      )
  }

  updateBoard(id: String, board: BoardModel) {
    return this.http.put<BoardModel[]>(`http://localhost:8080/api/board/${id}`, board)
      .pipe(
        catchError(this.errorService.handleError)
      )
  }

  getBoardById(id: String) {
    return this.http.get<BoardModel>(`http://localhost:8080/api/board/${id}`)
  }

  getBoards() {
    return this.http.get<BoardModel[]>('http://localhost:8080/api/board')
      .pipe(
        catchError(this.errorService.handleError)
      )
  }

  createColumn(id: String, name: string) {
    const body = {'boardID': id, 'name': name}
    return this.http.post<BoardModel>('http://localhost:8080/api/columns', body)
      .pipe(
        catchError(this.errorService.handleError)
      )
  }

  createTask(task: ColumnTaskModel) {
    return this.http.post<BoardModel>('http://localhost:8080/api/tasks', task)
      .pipe(
        catchError(this.errorService.handleError)
      )
  }

  updateTask(task: ColumnTaskModel) {
    return this.http.put<BoardModel>('http://localhost:8080/api/tasks', task)
      .pipe(
        catchError(this.errorService.handleError)
      )
  }
}
