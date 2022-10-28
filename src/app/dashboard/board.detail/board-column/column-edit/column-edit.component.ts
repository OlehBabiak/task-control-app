import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {BoardService} from "../../../../services/board.service";
import {DataStorageService} from "../../../../shared/data-storage/data-storage.service";
import {} from 'rxjs'

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

  private transformColumnName(value: string) {
    return value.split(' ').map(value =>
      value.charAt(0).toUpperCase() + value.slice(1)
    ).join('')
  }

  onSubmit(form: NgForm) {
    const colName = this.transformColumnName(form.value.name)
    console.log(colName)
    this.dataStorage.createColumn(this.id, colName)
    this.router.navigate(['../'], {relativeTo: this.route})
  }
}
