import {Component, OnDestroy, OnInit} from '@angular/core';
import {BoardModel} from '../../../shared/board-model';
import {BoardService} from '../../../services/board.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ModalService} from '../../../services/modal.service';
import {DataStorageService} from '../../../shared/data-storage/data-storage.service';
import {Observable, Subscription} from 'rxjs';
import {BoardColumnModel} from '../../../shared/board.column-model';
import {ErrorModel} from "../../../shared/errors/error-model";
import {Store} from "@ngrx/store";

@Component({
  selector: 'app-board.detail',
  templateUrl: './board.detail.component.html',
  styleUrls: ['./board.detail.component.scss']
})
export class BoardDetailComponent implements OnInit, OnDestroy {
  boardDetail$: Observable<{ board: BoardModel }>;
  private subscription: Subscription;
  private errorSubscription: Subscription
  error: ErrorModel | null

  constructor(
    private boardService: BoardService,
    private router: Router,
    private route: ActivatedRoute,
    private dataStorage: DataStorageService,
    private modalService: ModalService,
    private store: Store<{ dashboardList: { board: BoardModel } }>
  ) {
  }

  ngOnInit(): void {
    this.route.params
      .subscribe((params: Params) => {
        this.dataStorage.getBoardById(params['id']).subscribe({
          next: (res: BoardModel) => {
            this.boardService.setBoard(res)
          },
          error: (err) => {
            this.dataStorage.errorSubj.next(err)
          }
        })
      })

    this.boardDetail$ = this.store.select('dashboardList');

    this.errorSubscription = this.dataStorage
      .errorSubj
      .subscribe(err => {
        this.error = err
      })
  }

  onNewColumn() {
    this.router.navigate(['new'], {relativeTo: this.route})
  }


  ngOnDestroy() {
    if (this.errorSubscription) {
      this.errorSubscription.unsubscribe()
    }
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }

  onAddTask(column: BoardColumnModel) {
    this.modalService.open(null, 'openTask', column)
  }

  onErrorHide(event: null) {
    this.error = event
  }
}
