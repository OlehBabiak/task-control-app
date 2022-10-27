import {Component, Input, OnInit} from '@angular/core';
import {BoardColumnModel} from "../../../../shared/board.column-model";
import {ModalService} from "../../../../services/modal.service";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {ColumnTaskModel} from "../../../../shared/column.task-model";

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
    this.modalService.open(null, 'openTask', this.column)
  }


}
