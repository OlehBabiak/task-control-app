import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {ModalService} from '../../../../../services/modal.service';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {BoardService} from '../../../../../services/board.service';
import {DataStorageService} from '../../../../../shared/data-storage/data-storage.service';
import {ColumnTaskModel} from '../../../../../shared/column.task-model';
import {BoardModel} from '../../../../../shared/board-model';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.scss']
})
export class TaskEditComponent implements OnInit, OnDestroy {
  display$: Observable<'open' | 'close' | 'openTask' | 'closeTask'>;
  editMode = this.modalService.boardIndex
  status: string
  boardId: string;
  taskForm: FormGroup
  task: ColumnTaskModel
  private subscription: Subscription;


  constructor(
    public modalService: ModalService,
    private route: ActivatedRoute,
    private boardService: BoardService,
    private dataStorage: DataStorageService,
  ) {
  }

  ngOnInit(): void {
    this.display$ = this.modalService.watch();
    this.initForm()
  }

  private initForm() {
    let name = '';
    let desc = '';
    let checkBox = '';
    let comments = new FormArray([]);

    this.taskForm = new FormGroup({
      'name': new FormControl(null, [Validators.required, Validators.minLength(5)]),
      'archive': new FormControl(null),
      'description': new FormControl(null),
      'comments': comments
    })

    this.subscription = this.modalService.taskSubj
      .subscribe((value: ColumnTaskModel) => {
        this.task = value
        if (value) {
          name = value.name;
          desc = value.description;
          checkBox = this.task.status
          if (value.comments) {
            for (const comment of value.comments) {
              comments.push(
                new FormGroup({
                  'comment': new FormControl(comment.comment)
                })
              )
            }
          }

          this.taskForm = new FormGroup({
            'name': new FormControl(name, [Validators.required, Validators.minLength(5)]),
            'archive': new FormControl(this.task.status),
            'description': new FormControl(desc),
            'comments': comments
          })
        }
      })
  }

  onAddComment() {
    const formControl = new FormGroup({
      'comment': new FormControl(null, [Validators.required, Validators.minLength(5)]),
    });
    (<FormArray>this.taskForm.get('comments')).push(formControl)
  }

  get controls() {
    return (this.taskForm.get('comments') as FormArray).controls;
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.taskForm.get('comments')).removeAt(index)
  }

  onDeleteIngredients() {
    (<FormArray>this.taskForm.get('comments')).clear()
  }

  onSubmit() {
    if (this.modalService.boardIndex === null) {
      const {boardID, name} = this.modalService.column
      const newTask = new ColumnTaskModel(boardID, this.taskForm.value.name, name)
      this.dataStorage.createTask(newTask)
        .subscribe({
          next: (res: BoardModel) => this.boardService.setBoard(res),
          error: (err) => {
            this.dataStorage.errorSubj.next(err)
          }
        })
    } else {
      const {status, _id, boardID} = this.task
      const taskStatus = this.task.status !== 'archive' ? status : this.task.status;
      const updatedTask = new ColumnTaskModel(boardID, this.taskForm.value.name, taskStatus, this.taskForm.value.description, _id, this.taskForm.value.comments)
      this.dataStorage.updateTask(updatedTask)
        .subscribe({
          next: (res: BoardModel) => this.boardService.setBoard(res),
          error: (err) => {
            this.dataStorage.errorSubj.next(err)
          }
        })
    }
    this.modalService.close('closeTask');
    (<FormArray>this.taskForm.get('comments')).clear()
  }

  onClose() {
    this.modalService.close('closeTask');
    (<FormArray>this.taskForm.get('comments')).clear()
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

  changeStatus(checked: Boolean) {
    if (checked) {
      this.task.status = 'archive'
    } else {
      return
    }
  }
}


