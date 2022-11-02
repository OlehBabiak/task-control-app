import {Component, OnDestroy, OnInit} from '@angular/core';
import {BoardModel} from "../../shared/board-model";
import {BoardService} from "../../services/board.service";
import {ModalService} from "../../services/modal.service";
import {map, Observable, Subscribable, Subscription} from "rxjs";
import {DataStorageService} from "../../shared/data-storage/data-storage.service";
import {ActivatedRoute} from "@angular/router";
import {ErrorModel} from "../../shared/errors/error-model";

@Component({
  selector: 'app-dashboard-list',
  templateUrl: './dashboard-list.component.html',
  styleUrls: ['./dashboard-list.component.scss']
})
export class DashboardListComponent implements OnInit, OnDestroy {
  boards: BoardModel[]
  subscription: Subscription
  private errorSubscription: Subscription
  error: ErrorModel | null

  constructor(
    private dataStorage: DataStorageService,
    private boardService: BoardService,
    private modalService: ModalService,
    private routes: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.routes.data.subscribe({
      next: ({boards}) =>  this.boards = boards,
    })

    this.dataStorage.getBoards().subscribe({
      next: (res: BoardModel[]) => this.boardService.setBoards(res),
      error: (err) => {
        this.dataStorage.errorSubj.next(err)
      }
    })

    this.subscription = this.boardService
      .boardsChanged
      .subscribe((value: any) => {
        this.boards = value;
      })

    this.errorSubscription = this.dataStorage
      .errorSubj
      .subscribe(err => {
        this.error = err
      })
  }

  onErrorHide(event: null) {
    this.error = event
  }

  ngOnDestroy() {
    if (this.errorSubscription) {
      this.errorSubscription.unsubscribe()
    }
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }
}
