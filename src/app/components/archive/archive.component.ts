import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataStorageService} from '../../shared/data-storage/data-storage.service';
import {ActivatedRoute, Router} from '@angular/router';
import {BoardService} from '../../services/board.service';
import {ColumnTaskModel} from '../../shared/column.task-model';
import {Observable, Subscription} from 'rxjs';
import {ErrorModel} from "../../shared/errors/error-model";
import {Store} from "@ngrx/store";
import * as fromDashboardList from '../dashboard/store/reducers/dashboard.reducer'
import * as fromError from "../dashboard/store/reducers/error.reducer";
import * as ErrorActions from '../../components/dashboard/store/actions/error.actions'

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent implements OnInit, OnDestroy {

  tasks$: Observable<{ tasks: ColumnTaskModel[] }>;
  error: ErrorModel | null;
  private errorSubscription: Subscription

  constructor(
    private dataStorage: DataStorageService,
    private boardService: BoardService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromDashboardList.BoardState>,
    private errStore: Store<fromError.ErrorState>
  ) {
  }

  ngOnInit(): void {
    this.dataStorage.getArchiveTask('archive')
      .subscribe({
        next: (res: ColumnTaskModel[]) => {
          this.boardService.setTask(res)
        },
        error: (err) => {
          this.errStore.dispatch(new ErrorActions.SetError(err))
        }
      })

    this.tasks$ = this.store.select('dashboardList');
    this.errorSubscription = this.errStore.select('errorItem').subscribe((state) => {
      this.error = state.error
    })
  };

  onErrorHide(event: null) {
    this.errStore.dispatch(new ErrorActions.SetError(event))
  };

  onDetailShow(index: string) {
    this.router.navigate([index], {relativeTo: this.route})
  }

  ngOnDestroy() {
    this.errorSubscription.unsubscribe()
  }
}
