import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../-services/auth.service';

@Component({
  selector: 'auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.sass']
})

export class AuthComponent implements OnInit {

  constructor(
    private _authService: AuthService
  ) { }

  ngOnInit() {
    this._authService.x_setUserLoggedOut();
  }

}
