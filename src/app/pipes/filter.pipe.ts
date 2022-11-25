import {Pipe, PipeTransform} from '@angular/core';
import {BoardModel} from '../shared/board-model';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(boards: BoardModel[], args: string): BoardModel[] {
    console.log(args)
    let filtered = [...boards];
    if (args) {
      return filtered.filter(board => board.name.search(args) !== -1).slice();
    }
    return boards.slice()
  }
}
