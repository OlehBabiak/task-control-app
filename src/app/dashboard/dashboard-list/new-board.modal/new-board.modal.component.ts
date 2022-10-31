import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ModalService} from "../../../services/modal.service";
import {Observable} from "rxjs";
import {NgForm} from "@angular/forms";
import {BoardService} from "../../../services/board.service";
import {ActivatedRoute, Router} from "@angular/router";
import {DataStorageService} from "../../../shared/data-storage/data-storage.service";
import {BoardModel} from "../../../shared/board-model";

@Component({
  selector: 'app-new-board-modal',
  templateUrl: './new-board.modal.component.html',
  styleUrls: ['./new-board.modal.component.scss']
})
export class NewBoardModalComponent implements OnInit {
  @ViewChild('form', {static: false}) boardForm: NgForm;
  display$: Observable<'open' | 'close' | 'openTask' | 'closeTask'>;
  submitted = false;
  editMode = this.modalService.boardIndex;

  constructor(
    public modalService: ModalService,
    private boardService: BoardService,
    private dataStorage: DataStorageService,
    private route: ActivatedRoute, private router: Router,
  ) {}

  ngOnInit() {
    this.display$ = this.modalService.watch();
  }

  onSubmit() {
    this.submitted = true
    if(this.modalService.boardIndex === null){
      this.dataStorage
        .storeBoard(this.boardForm.value)
        .subscribe({
          next: (res: BoardModel[]) => this.boardService.setBoards(res),
          error: (err) => {
            this.dataStorage.errorSubj.next(err)
          }
        })

      this.router.navigate(['dashboard'], {relativeTo: this.route.parent})
    }else{
      this.dataStorage.updateBoard(this.modalService.boardIndex.toString(), this.boardForm.value)
        .subscribe({
          next: (res: BoardModel[]) => this.boardService.setBoards(res),
          error: (err) => {
            this.dataStorage.errorSubj.next(err)
          }
        })
      this.router.navigate(['dashboard'], {relativeTo: this.route.parent})
    }
    this.modalService.close('close');
  }

  onClose() {
    this.modalService.close('close');
  }

}
