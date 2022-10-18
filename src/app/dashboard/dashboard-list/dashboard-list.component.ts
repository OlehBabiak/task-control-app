import {Component, OnDestroy, OnInit} from '@angular/core';
import {BoardModel} from "../board-model";
import {BoardService} from "../../services/board.service";
import {ModalService} from "../../services/modal.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-dashboard-list',
  templateUrl: './dashboard-list.component.html',
  styleUrls: ['./dashboard-list.component.scss']
})
export class DashboardListComponent implements OnInit, OnDestroy {
  boards: BoardModel[]
  private subscription: Subscription

  constructor(private boardService: BoardService, private modalService: ModalService) {
  }

  ngOnInit(): void {
    this.subscription = this.boardService
      .boardChanged
      .subscribe((value: BoardModel[]) => {
        this.boards = value;
      })
    this.boards = this.boardService.getBoards()
  }


  onModalOpen() {
    this.modalService.open(null, 'open')
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}
