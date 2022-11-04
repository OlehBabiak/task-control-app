import {Component, Input} from '@angular/core';
import {ColumnTaskModel} from "../../../../shared/column.task-model";
import {ActivatedRoute, Router} from "@angular/router";
import {ModalService} from "../../../../services/modal.service";
import {BoardColumnModel} from "../../../../shared/board.column-model";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent {
  @Input() task: ColumnTaskModel;
  @Input() column: BoardColumnModel

  constructor(private router: Router, private route: ActivatedRoute, private modalService: ModalService) {
  }

  onShowDetail() {
    this.modalService.open(this.column.boardID, 'openTask', this.column, this.task)
  }
}
