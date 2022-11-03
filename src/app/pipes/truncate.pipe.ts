import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'limitTo'
})
export class TruncatePipe implements PipeTransform {

  transform(value: string, args: string): string {
    let limit = args ? parseInt(args, 10) : 1000;
    let trail = '...';
//якщо строка > за ліміт повертаємо строку довжиною в ліміт + ..., інакше цілу строку
    return value.length > limit ? value.substring(0, limit) + trail : value;
  }
}
