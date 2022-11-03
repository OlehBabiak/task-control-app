import {Component} from '@angular/core';
import {ModalService} from "../services/modal.service";
import {BoardService} from "../services/board.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  sortValues: string[] = ['ASC Name', 'DESC Name', 'ASC Create date', 'DSC Create Date'];
  filter: string = '';
  sort: string = ''

  constructor(private modalService: ModalService, private boardService: BoardService) {
  }

  onModalOpen() {
    this.modalService.open(null, 'open')
  }

  sortValueChange(e) {
    this.boardService.sortBoards(e.target.value)
  }

  filterChange(e) {
    this.boardService.filterBoards(e.target.value)
  }
}
