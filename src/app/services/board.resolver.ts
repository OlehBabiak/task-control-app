import {Injectable} from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import {Observable} from 'rxjs';
import {BoardModel} from "../shared/board-model";
import {DataStorageService} from "../shared/data-storage/data-storage.service";
import {BoardService} from "./board.service";

@Injectable({
  providedIn: 'root'
})
export class BoardResolver implements Resolve<BoardModel> {
  id: string

  constructor(private dataStorage: DataStorageService, private boardService: BoardService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<BoardModel> | Promise<BoardModel> | BoardModel {
    const boardId = route.params['id']
    const board = this.boardService.getBoard(boardId)
    if (!board) {
      console.log('not board in state ', board)
      return this.dataStorage.getBoardById(boardId)
    }
    console.log('board in state' , board)
    return board
  }
}
