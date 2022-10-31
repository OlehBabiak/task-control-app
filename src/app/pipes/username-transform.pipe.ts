import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'usernameTransform'
})
export class UsernameTransformPipe implements PipeTransform {

  transform(value: string, args: string): string {
    let name = '';
    name = value.split(args)[0]
    return name
  }

}
