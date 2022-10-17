import {Component, OnInit, ViewChild} from '@angular/core';
import {ModalService} from "../../../services/modal.service";
import {Observable} from "rxjs";
import {NgForm} from "@angular/forms";
import {BoardService} from "../../../services/board.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-new-board-modal',
  templateUrl: './new-board.modal.component.html',
  styleUrls: ['./new-board.modal.component.scss']
})
export class NewBoardModalComponent implements OnInit {
  @ViewChild('form', {static: false}) boardForm: NgForm;
  display$: Observable<'open' | 'close'>;
  columns = ['Todo', 'In progress', 'Done'];
  submitted = false;
  editMode = this.modalService.boardIndex;

  constructor(
    public modalService: ModalService,
    private boardService: BoardService,
    private router: Router
  ) {}

  ngOnInit() {
    this.display$ = this.modalService.watch();
  }

  onSubmit() {
    this.submitted = true
    if(this.modalService.boardIndex === null){
      this.boardService.createBoard(this.boardForm.value)
    }else{
      this.boardService.editBoard(this.modalService.boardIndex, this.boardForm.value)
    }
    this.modalService.close();
  }
}
