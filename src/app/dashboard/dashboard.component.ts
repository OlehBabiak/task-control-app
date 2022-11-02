import {Component, OnInit} from '@angular/core';
import {ModalService} from "../services/modal.service";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {BoardService} from "../services/board.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  sortForm: FormGroup;
  filterForm: FormGroup;
  sortValues: string[] = ['ASC Name', 'DESC Name', 'ASC Create date', 'DSC Create Date'];
  filter: string = '';
  sort: string = ''

  constructor(private modalService: ModalService, private boardService: BoardService) {
  }

  ngOnInit(): void {
    this.filterForm = new FormGroup({
      'filter': new FormControl(null)
    })
    this.sortForm = new FormGroup({
      'sort': new FormControl(null)
    })
  }

  onModalOpen() {
    this.modalService.open(null, 'open')
  }

  sortValueChange(e) {
    console.log(e.target.value)
    this.sortForm = new FormGroup({
      'sort': new FormControl(e.target.value)
    })
    this.sort = this.sortForm.get('sort').value
  }

  filterChange(e) {
    this.boardService.filterBoards(e.target.value)
    console.log('dfsdfsdf')
    console.log(e.target.value)
  }
}
