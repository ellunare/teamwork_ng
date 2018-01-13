import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { AuthService } from '../../../-services/auth.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  temp_email = '';
  temp_password = '';

  constructor(
    private router: Router,
    private _authService: AuthService
  ) { }

  ngOnInit() {
  }

  login(e) {
    e.preventDefault();

    if (!this.temp_email || !this.temp_password) {
      console.log('Заполните поля');
    }
    else {
      // // Есть ли пользователь? Верны ли данные
      let user = {
        email: this.temp_email,
        password: this.temp_password
      }

      this._authService.x_authenticateUser(user)
        .subscribe(data => {
          // console.log(data.msg);
          if (data.success) {
            this._authService.x_storeUserData(data.token, data.user);
            // Пользователь есть в базе и данные верны - изменяем статус на LOGGED IN
            let response_login = this._authService.x_setUserLoggedIn();
            // Переходим в dash
            this.router.navigate(['dash']);
          }
          else {
            this.router.navigate(['login']);
          }
        });
    }
  }

}