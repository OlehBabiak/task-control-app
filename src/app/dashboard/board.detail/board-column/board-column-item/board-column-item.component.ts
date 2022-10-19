import {Component, Input, OnInit} from '@angular/core';
import {BoardColumnModel} from "../../../../shared/board.column-model";
import {ModalService} from "../../../../services/modal.service";

@Component({
  selector: 'app-board-column-item',
  templateUrl: './board-column-item.component.html',
  styleUrls: ['./board-column-item.component.scss']
})
export class BoardColumnItemComponent implements OnInit {
  @Input() column: BoardColumnModel;

  constructor(private modalService: ModalService) {
  }

  ngOnInit(): void {
  }

  onAddTask() {
    this.modalService.open(null,'openTask')
  }
}
