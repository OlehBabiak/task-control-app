import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BoardService} from '../../services/board.service';
import {BoardModel} from '../board-model';

import {ColumnTaskModel} from '../column.task-model';
import {catchError} from 'rxjs/operators';
import {ErrorService} from '../errors/error.service';
import {API_PATH, API_PATH_BOARD, API_PATH_COLUMN, API_PATH_TASK} from '../../constants/constants'

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(
    private http: HttpClient,
    private boardService: BoardService,
    private errorService: ErrorService,
  ) {
  }

  storeBoard(board: BoardModel) {
    return this.http
      .post<BoardModel[]>(`${API_PATH}/${API_PATH_BOARD}`,
        board)
      .pipe(
        catchError(this.errorService.handleError)
      )
  }

  deleteBoard(id: String) {
    return this.http.delete<BoardModel[]>(`${API_PATH}/${API_PATH_BOARD}/${id}`)
      .pipe(
        catchError(this.errorService.handleError)
      )
  }

  updateBoard(id: String, board: BoardModel) {
    return this.http.put<BoardModel[]>(`${API_PATH}/${API_PATH_BOARD}/${id}`, board)
      .pipe(
        catchError(this.errorService.handleError)
      )
  }

  getBoardById(id: String) {
    return this.http.get<BoardModel>(`${API_PATH}/${API_PATH_BOARD}/${id}`)
      .pipe(
        catchError(this.errorService.handleError)
      )
  }

  getBoards() {
    return this.http.get<BoardModel[]>(`${API_PATH}/${API_PATH_BOARD}`)
      .pipe(
        catchError(this.errorService.handleError)
      )
  }

  createColumn(id: String, name: string) {
    const body = {'boardID': id, 'name': name}
    return this.http.post<BoardModel>(`${API_PATH}/${API_PATH_COLUMN}`, body)
      .pipe(
        catchError(this.errorService.handleError)
      )
  }

  createTask(task: ColumnTaskModel) {
    return this.http.post<BoardModel>(`${API_PATH}/${API_PATH_TASK}`, task)
      .pipe(
        catchError(this.errorService.handleError)
      )
  }

  updateTask(task: ColumnTaskModel) {
    console.log('updated task', task)
    return this.http.put<BoardModel>(`${API_PATH}/${API_PATH_TASK}`, task)
      .pipe(
        catchError(this.errorService.handleError)
      )
  }

  getArchiveTask(params: string) {
    return this.http.get<ColumnTaskModel[]>(`${API_PATH}/${API_PATH_TASK}/${params}`)
      .pipe(
        catchError(this.errorService.handleError)
      )
  }

  getTaskById(id: string) {
    return this.http.get<ColumnTaskModel>(`${API_PATH}/${API_PATH_TASK}/${id}`)
      .pipe(
        catchError(this.errorService.handleError)
      )
  }
}
