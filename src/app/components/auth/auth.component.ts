import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../shared/auth.service';
import {AuthResponseData} from './interfaces/auth-response-data'
import {Observable} from 'rxjs';
import {ErrorModel} from '../../shared/errors/error-model';
import {CustomValidators} from '../../validators/custom-validators';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  signupForm: FormGroup;
  isLoginMode = true;
  submitted = false;
  isLoading = false;
  error: ErrorModel | null = null;
  userCreateMessage: string = null
  pattern: string = '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$'


  constructor(private authService: AuthService) {
  }

  ngOnInit() {

    this.signupForm = new FormGroup({
      'email': new FormControl(null,
        [
          Validators.required,
          CustomValidators.forbiddenEmails,
          Validators.pattern(this.pattern)]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
    })
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode
  }

  onSubmit() {
    this.submitted = true;
    if (!this.signupForm.valid) {
      return
    }

    let authObs: Observable<AuthResponseData>

    this.isLoading = true

    if (this.isLoginMode) {
      authObs = this.authService.login(this.signupForm.value)
      //login
    } else {
      this.isLoginMode = true;
      authObs = this.authService.register(this.signupForm.value)
      //register
    }
    authObs.subscribe({
      next: data => {
        this.isLoading = false;
        this.userCreateMessage = data['message']
        this.error = null
      },
      error: (err) => {
        this.error = err;
        this.isLoading = false;
      }
    })

    this.signupForm.reset();
 }

  closeAlert() {
    this.userCreateMessage = null
  }

  onErrorHide(event: null) {
    this.error = event
  }
}
