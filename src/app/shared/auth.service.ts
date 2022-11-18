import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {BehaviorSubject} from 'rxjs'
import {AuthModel} from '../components/auth/auth.model';
import {User} from '../components/auth/user.model';
import {Router} from '@angular/router';
import {AuthResponseData} from '../components/auth/interfaces/auth-response-data'
import {ErrorService} from './errors/error.service';
import {API, API_PATH_AUTH, PATH_LOGIN, PATH_REGISTER, PATH_HOME, API_PATH} from '../constants/constants'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user = new BehaviorSubject<User>(null);
  private millisecondsInMinute = 60000;
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router, private errorService: ErrorService) {
  }


  register(body: AuthModel) {
    return this.http.post<AuthResponseData>(`${API}/${API_PATH_AUTH}/${PATH_REGISTER}`, body)
      .pipe(catchError(this.errorService.handleError))
  }

  login(body: AuthModel) {
    return this.http.post<AuthResponseData>(`${API_PATH}/${API_PATH_AUTH}/${PATH_LOGIN}`, body)
      .pipe(
        catchError(this.errorService.handleError),
        tap(
          // в next передаємо дані з AuthResponseData
          ({email, id, jwt_token, refresh_token, expiresIn, expiresInRefresh}) => {
            this.handleAuth(email, id, jwt_token, refresh_token, +expiresIn, +expiresInRefresh)
            this.router.navigate([`./${PATH_HOME}`])
          }
        ))
  }

  logout() {
    //видаляєм юзера з локал сторедж, якщо токен не закінчився очищуєм Timeout через який відбудеться autoLogout
    this.user.next(null);
    this.router.navigate(['./auth']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    //expirationDuration - закінчення часу токена
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration)
  }

  autologin() {
    const userData: {
      email: string
      id: string
      _token: string
      _refresh_token: string
      _tokenExpirationDate: string;
      _refreshTokenExpirationDate: string
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return
    }

    const loadedUserFromLS = new User(
      userData.email,
      userData.id,
      userData._token,
      userData._refresh_token,
      new Date(userData._tokenExpirationDate),
      new Date(userData._refreshTokenExpirationDate)
    );
    //Перевіряємо чи наш токен ще активний, якщо так то активуємо юзера
    //expirationTime -
    if (loadedUserFromLS.token) {
      const expirationTime = new Date(userData._refreshTokenExpirationDate).getTime() - new Date().getTime()
      this.autoLogout(expirationTime)
      this.user.next(loadedUserFromLS)
    }
  }

  private handleAuth(
    email: string,
    userId: string,
    token: string,
    refreshToken: string,
    expiresIn: number,
    refreshExpiresIn: number) {
    //час закінченні токену
    const expirationDate = new Date(new Date().getTime() + expiresIn * this.millisecondsInMinute)
    //час закінчення рефреш токену
    const refreshExpirationDate = new Date(new Date().getTime() + refreshExpiresIn * this.millisecondsInMinute)
    const user = new User(
      email,
      userId,
      token,
      refreshToken,
      expirationDate,
      refreshExpirationDate
    );
    this.user.next(user);
    //розлоговуємось
    this.autoLogout(refreshExpiresIn * this.millisecondsInMinute)
    localStorage.setItem('userData', JSON.stringify(user))
  }

}
