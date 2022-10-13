import {Component, OnInit} from '@angular/core';
import {BoardModel} from "../board-model";
import {BoardService} from "../../services/board.service";
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
  selector: 'app-board.detail',
  templateUrl: './board.detail.component.html',
  styleUrls: ['./board.detail.component.scss']
})
export class BoardDetailComponent implements OnInit {
  boardDetail: BoardModel;
  id: number

  constructor(
    private boardService: BoardService,
    private router: Router,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.boardDetail = this.boardService.getBoard(this.id)
      console.log(this.boardDetail)
    })
  }

}
