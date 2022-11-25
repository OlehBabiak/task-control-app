import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Store} from '@ngrx/store';

import {BoardModel} from '../../../shared/board-model';
import {BoardService} from '../../../services/board.service';
import {DataStorageService} from '../../../shared/data-storage/data-storage.service';
import {ErrorModel} from '../../../shared/errors/error-model';
import * as fromDashboardList from '../store/reducers/dashboard.reducer'
import * as fromError from '../store/reducers/error.reducer'
import * as ErrorActions from '../store/actions/error.actions'


@Component({
  selector: 'app-dashboard-list',
  templateUrl: './dashboard-list.component.html',
  styleUrls: ['./dashboard-list.component.scss']
})
export class DashboardListComponent implements OnInit, OnDestroy {
  @Input() sort: string;
  @Input() filter: string;
  boards: BoardModel[];
  error: ErrorModel | null;
  private errorSubscription: Subscription;
  private subscription: Subscription;

  constructor(
    private dataStorage: DataStorageService,
    private boardService: BoardService,
    private store: Store<fromDashboardList.BoardState>,
    private errorStore: Store<fromError.ErrorState>
  ) {
  }

  ngOnInit(): void {
    this.subscription = this.store.select('dashboardList').subscribe((state) => {
      this.boards = state.boards
    });
    this.errorSubscription = this.errorStore.select('errorItem').subscribe((state) => {
      this.error = state.error
    });

    this.dataStorage.getBoards().subscribe({
      next: (res: BoardModel[]) => {
        this.boardService.setBoards(res)
      },
      error: (err) => {
        this.errorStore.dispatch(new ErrorActions.SetError(err))
      }
    });
  };

  onErrorHide(event: null) {
    this.errorStore.dispatch(new ErrorActions.SetError(event))
  };

  ngOnDestroy() {
    this.errorSubscription.unsubscribe()
  }
}
