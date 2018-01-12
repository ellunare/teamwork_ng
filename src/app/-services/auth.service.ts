import { Injectable } from '@angular/core';

import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthService {

  url = 'http://127.0.0.1:3000/api/auth';

  private isUserLoggedIn;

  authToken: any;
  user: any;

  constructor(
    private _http: Http
  ) {
    this.isUserLoggedIn = false;
  }

  x_signUp(newUser) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this._http.post(this.url + '/register', newUser, { headers: headers })
      .map(res => res.json());
  }

  x_authenticateUser(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this._http.post(this.url + '/authenticate', user, { headers: headers })
      .map(res => res.json());
  }

  x_storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user))
    this.authToken = token;
    this.user = user;
  }

  x_setUserLoggedIn() {
    this.isUserLoggedIn = true;
  }

  x_setUserLoggedOut() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
    this.isUserLoggedIn = false;
    console.log('Logged Out');
  }

  x_getUserLoggedIn() {
    // return this.isUserLoggedIn;
    return tokenNotExpired('id_token');
  }

}
