import {Component, OnInit} from '@angular/core';
import {BoardModel} from '../../../shared/board-model';
import {BoardService} from '../../../services/board.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ModalService} from '../../../services/modal.service';
import {DataStorageService} from '../../../shared/data-storage/data-storage.service';
import {Observable} from 'rxjs';
import {BoardColumnModel} from '../../../shared/board.column-model';
import {ErrorModel} from "../../../shared/errors/error-model";
import {Store} from "@ngrx/store";
import * as fromDashboardList from '../store/reducers/dashboard.reducer'
import * as fromError from "../store/reducers/error.reducer";
import * as ErrorActions from '../store/actions/error.actions'

@Component({
  selector: 'app-board.detail',
  templateUrl: './board.detail.component.html',
  styleUrls: ['./board.detail.component.scss']
})
export class BoardDetailComponent implements OnInit {
  boardDetail$: Observable<{ board: BoardModel }>;
  error: ErrorModel | null

  constructor(
    private boardService: BoardService,
    private router: Router,
    private route: ActivatedRoute,
    private dataStorage: DataStorageService,
    private modalService: ModalService,
    private store: Store<fromDashboardList.BoardState>,
    private errStore: Store<fromError.ErrorState>
  ) {
  }

  ngOnInit(): void {
    this.route.params
      .subscribe((params: Params) => {
        this.dataStorage.getBoardById(params['id'])
          .subscribe({
            next: (res: BoardModel) => {
              this.boardService.setBoard(res)
            },
            error: (err) => {
              this.errStore.dispatch(new ErrorActions.SetError(err))
            }
          })
      })

    this.boardDetail$ = this.store.select('dashboardList');
    this.errStore.select('errorItem').subscribe((state) => {
      this.error = state.error
    });
  }

  onNewColumn() {
    this.router.navigate(['new'], {relativeTo: this.route})
  }

  onAddTask(column: BoardColumnModel) {
    this.modalService.open(null, 'openTask', column)
  }

  onErrorHide(event: null) {
    this.error = event
  }
}
