import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';

import {BoardModel} from '../../../shared/board-model';
import {BoardService} from '../../../services/board.service';
import {DataStorageService} from '../../../shared/data-storage/data-storage.service';
import {ErrorModel} from '../../../shared/errors/error-model';

@Component({
  selector: 'app-dashboard-list',
  templateUrl: './dashboard-list.component.html',
  styleUrls: ['./dashboard-list.component.scss']
})
export class DashboardListComponent implements OnInit, OnDestroy {
  boards$: Observable<BoardModel[]>;
  private errorSubscription: Subscription;
  error: ErrorModel | null;

  constructor(
    private dataStorage: DataStorageService,
    private boardService: BoardService,
  ) {
  }

  ngOnInit(): void {
    this.dataStorage.getBoards().subscribe({
      next: (res: BoardModel[]) => {
        this.boardService.setBoards(res)
      },
      error: (err) => {
        this.dataStorage.errorSubj.next(err)
      }
    });

    this.boards$ = this.boardService.boardsChanged;

    this.errorSubscription = this.dataStorage
      .errorSubj
      .subscribe(err => {
        this.error = err
      })
  };

  onErrorHide(event: null) {
    this.error = event
  };

  ngOnDestroy() {
    if (this.errorSubscription) {
      this.errorSubscription.unsubscribe()
    }
  };
}
