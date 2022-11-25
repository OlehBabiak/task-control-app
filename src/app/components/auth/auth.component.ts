import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../shared/auth.service';
import {AuthResponseData} from './interfaces/auth-response-data'
import {Observable, Subscription} from 'rxjs';
import {ErrorModel} from '../../shared/errors/error-model';
import {CustomValidators} from '../../validators/custom-validators';
import {ErrorPageComponent} from '../../shared/errors/error-page/error-page.component'
import {PlaceholderDirective} from '../../shared/placeholder/placeholder.directive';
import {EMAIL_PATTERN} from '../../constants/constants';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {
  signupForm: FormGroup;
  isLoginMode = true;
  submitted = false;
  isLoading = false;
  userCreateMessage: string = null;
  @ViewChild(PlaceholderDirective, {static: false}) errorHost: PlaceholderDirective;

  private closeSub: Subscription


  constructor(private authService: AuthService) {
  }

  ngOnInit() {

    this.signupForm = new FormGroup({
      'email': new FormControl(null,
        [
          Validators.required,
          CustomValidators.forbiddenEmails,
          Validators.pattern(EMAIL_PATTERN)]),
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
      },
      error: (err) => {
        this.showErrorAlert(err)
        this.isLoading = false;
      }
    })

    this.signupForm.reset();
  }

  closeAlert() {
    this.userCreateMessage = null
  }

  ngOnDestroy() {
    if (this.closeSub) {
      this.closeSub.unsubscribe()
    }
  }

  private showErrorAlert(err: ErrorModel) {
    const hostViewContainerRef = this.errorHost.vieContainerRef;
    hostViewContainerRef.clear();
    const componentRef = hostViewContainerRef.createComponent(ErrorPageComponent);
    componentRef.instance.error = err;
    this.closeSub = componentRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    })
  }
}
