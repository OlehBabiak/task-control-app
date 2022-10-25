import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {BoardService} from "../../../../services/board.service";
import {DataStorageService} from "../../../../shared/data-storage/data-storage.service";

@Component({
  selector: 'app-column-edit',
  templateUrl: './column-edit.component.html',
  styleUrls: ['./column-edit.component.scss']
})
export class ColumnEditComponent implements OnInit {
  id: string;

  constructor(
    private route: ActivatedRoute,
    private boardService: BoardService,
    private router: Router,
    private dataStorage: DataStorageService
  ) {
  }

  ngOnInit(): void {
    this.route.parent.params
      .subscribe((params: Params) => {
        this.id = params.id
      })
  }

  onSubmit(form: NgForm) {
    this.dataStorage.createColumn(this.id, form.value)
    this.router.navigate(['../'], {relativeTo: this.route})
  }
}
