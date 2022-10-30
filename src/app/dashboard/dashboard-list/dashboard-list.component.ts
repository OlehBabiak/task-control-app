import {Component, OnDestroy, OnInit} from '@angular/core';
import {BoardModel} from "../../shared/board-model";
import {BoardService} from "../../services/board.service";
import {ModalService} from "../../services/modal.service";
import {Subscription} from "rxjs";
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
  private subscription: Subscription
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

    this.subscription = this.boardService
      .boardsChanged
      .subscribe((value: BoardModel[]) => {
        this.boards = value;
      })
    this.errorSubscription = this.dataStorage
      .errorSubj
      .subscribe( resp => {
        this.error = new ErrorModel(resp.status, resp.error.message)
      })
  }




  ngOnDestroy() {
    this.subscription.unsubscribe()
    this.errorSubscription.unsubscribe()
  }

  onErrorHide(event: null) {
    this.error = event
  }
}
