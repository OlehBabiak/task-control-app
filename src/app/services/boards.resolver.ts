import {Injectable} from '@angular/core';
import {Resolve, RouterStateSnapshot, ActivatedRouteSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {DataStorageService} from '../shared/data-storage/data-storage.service';
import {BoardModel} from '../shared/board-model';

@Injectable({
  providedIn: 'root'
})
export class BoardsResolver implements Resolve<BoardModel[]> {

  constructor(private dataStorage: DataStorageService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<BoardModel[]> | Promise<BoardModel[]> | BoardModel[]{
    return this.dataStorage.getBoards()
  }
}
