import {Injectable} from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot, ActivatedRoute, Params
} from '@angular/router';
import {map, Observable, Subscription} from 'rxjs';
import {DataStorageService} from "../shared/data-storage/data-storage.service";
import {BoardModel} from "../shared/board-model";
import {BoardService} from "./board.service";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class BoardsResolver implements Resolve<BoardModel[]> {

  constructor(private dataStorage: DataStorageService, private boardService: BoardService) {
  }


  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<BoardModel[]> | Promise<BoardModel[]> | BoardModel[]{
    const boards = this.boardService.getBoards();
    if (boards.length === 0) {
      return this.dataStorage.getBoards();
    }
    return boards
  }
}
