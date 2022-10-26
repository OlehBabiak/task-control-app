import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {BoardModel} from "../../shared/board-model";
import {BoardService} from "../../services/board.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {ModalService} from "../../services/modal.service";
import {DataStorageService} from "../../shared/data-storage/data-storage.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-board.detail',
  templateUrl: './board.detail.component.html',
  styleUrls: ['./board.detail.component.scss']
})
export class BoardDetailComponent implements OnInit, OnDestroy {
  boardDetail: BoardModel;
  private subscription: Subscription
  // boardId: string

  constructor(
    private boardService: BoardService,
    private router: Router,
    private route: ActivatedRoute,
    private dataStorage: DataStorageService,
    ) {
  }

  ngOnInit(): void {
    // this.route.params.subscribe((params: Params) => {
    //   this.boardId = params['id'];
    // })

    this.route.data.subscribe(({data}) => {
      this.boardDetail = data
    })

    this.subscription = this.boardService
      .boardChanged
      .subscribe((value: BoardModel) => {
        this.boardDetail = value
      })
  }

  onNewColumn() {
    this.router.navigate(['new'], {relativeTo: this.route})
  }


  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}
