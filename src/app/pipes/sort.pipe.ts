import {Pipe, PipeTransform} from '@angular/core';
import {BoardModel} from "../shared/board-model";

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(boards: BoardModel[], args: string): BoardModel[] {
    let sorted = [...boards];
    switch (args) {
      case 'ASC Name':
        sorted.sort((a: BoardModel, b: BoardModel) => {
          if (a.name > b.name) {
            return 1
          }
          if (a.name < b.name) {
            return -1
          }
          return 0
        })
        break;
      case 'DESC Name':
        sorted.sort((a: BoardModel, b: BoardModel) => {
          if (b.name > a.name) {
            return 1
          }
          if (b.name < a.name) {
            return -1
          }
          return 0
        })
        break;
      case 'ASC Create date':
        sorted.sort((a: BoardModel, b: BoardModel) => {
          if (a.createdAt > b.createdAt) {
            return 1
          }
          if (a.createdAt < b.createdAt) {
            return -1
          }
          return 0
        })
        break;
      case 'DSC Create Date':
        sorted.sort((a: BoardModel, b: BoardModel) => {
          if (b.createdAt > a.createdAt) {
            return 1
          }
          if (b.createdAt < a.createdAt) {
            return -1
          }
          return 0
        })
        break;
    }
    return sorted.slice()
  }
}
