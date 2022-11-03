import {FormControl} from '@angular/forms';
import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class CustomValidators {
  static forbiddenEmails(control: FormControl): { [s: string]: boolean } {
    const forbiddenEmails = ['test@test.com', 'oleg_bob@ukr.net']
    if (forbiddenEmails.indexOf(control.value) !== -1) {
      return {'emailIsForbidden': true};
    }
    return null;
  }

}
