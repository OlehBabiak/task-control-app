import {Component, Input, OnInit} from '@angular/core';
import {BoardModel} from "../board-model";
import {BoardService} from "../../services/board.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {ModalService} from "../../services/modal.service";

@Component({
  selector: 'app-board.detail',
  templateUrl: './board.detail.component.html',
  styleUrls: ['./board.detail.component.scss']
})
export class BoardDetailComponent implements OnInit {
  boardDetail: BoardModel;
  id: number;

  constructor(
    private boardService: BoardService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: ModalService
    ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.boardDetail = this.boardService.getBoard(this.id)
    })
  }

  onNewColumn() {
    this.router.navigate(['new'], {relativeTo: this.route})
  }

  onAddTask() {
    this.modalService.open(null,'openTask')
  }
}
