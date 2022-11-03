import {Component, Input} from '@angular/core';
import {BoardModel} from "../../../shared/board-model";
import {BoardService} from "../../../services/board.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ModalService} from "../../../services/modal.service";
import {DataStorageService} from "../../../shared/data-storage/data-storage.service";

@Component({
  selector: 'app-board-item',
  templateUrl: './board-item.component.html',
  styleUrls: ['./board-item.component.scss']
})
export class BoardItemComponent {
  @Input() board: BoardModel;
  descriptionLimitLength: string = '20';
  spanText: string = 'see more...'
  fullMode = false
  boardIcons: string[] = ['edit', 'delete']

  constructor(
    private boardService: BoardService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: ModalService,
    private dataStorage: DataStorageService
  ) {
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
      this.modalService.open(this.board._id, 'open')
    } else {
      this.dataStorage.deleteBoard(this.board._id)
        .subscribe({
          next: (res: BoardModel[]) => this.boardService.setBoards(res),
          error: (err) => {
            this.dataStorage.errorSubj.next(err)
          }
        })
    }
  }

}
