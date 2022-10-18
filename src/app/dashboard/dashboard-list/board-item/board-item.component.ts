import {Component, Input, OnInit} from '@angular/core';
import {BoardModel} from "../../board-model";
import {BoardService} from "../../../services/board.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ModalService} from "../../../services/modal.service";

@Component({
  selector: 'app-board-item',
  templateUrl: './board-item.component.html',
  styleUrls: ['./board-item.component.scss']
})
export class BoardItemComponent implements OnInit {
  @Input() board: BoardModel;
  @Input() index: number;
  descriptionLimitLength: string = '20';
  spanText: string = 'see more...'
  fullMode = false
  boardIcons: string[] = ['edit', 'delete']
  newBoard: BoardModel

  constructor(
    private boardService: BoardService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: ModalService
    ) {
  }

  ngOnInit(): void {

  }

  onShowMoreContent($event) {
    $event.stopPropagation()
    if (this.descriptionLimitLength === '20') {
      this.descriptionLimitLength = '1000';
      this.fullMode = true;
      this.spanText = 'see less...'
    } else {
      this.descriptionLimitLength = '20';
      this.fullMode = false;
      this.spanText = 'see more...'
    }
  }

  onDoChanges(icon: string, $event) {
    $event.stopPropagation()
    if (icon === this.boardIcons[0]) {
      this.modalService.open(this.index, 'open')
    } else {
      this.boardService.deleteBoard(this.index)
    }
  }
}
