import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BoardService} from "../../services/board.service";
import {BoardModel} from "../board-model";
import {tap} from "rxjs";
import {BoardColumnModel} from "../board.column-model";
import {ColumnTaskModel} from "../column.task-model";

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: HttpClient, private boardService: BoardService) {
  }

  storeBoard(board: BoardModel) {
    this.http.post<BoardModel[]>('http://localhost:8080/api/board', board)
      .subscribe(res => this.boardService.setBoards(res))
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
      .pipe(
        tap(boards => {

          this.boardService.setBoards(boards)
        })
      )
  }

  createColumn(id: String, name: string) {
    const body = {'boardID': id, 'name': name}
    this.http.post<BoardModel>('http://localhost:8080/api/columns', body)
      .subscribe(res => {
        this.boardService.setBoard(res)
      })
  }

  createTask(task: ColumnTaskModel){
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
