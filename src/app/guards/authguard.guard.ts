import { Injectable } from '@angular/core';

import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';

import { AuthService } from '../-services/auth.service';


@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private _authService: AuthService,
    private router: Router
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {

    if (this._authService.x_getUserLoggedIn()) {
      console.log('GUARD - Opened');
      return true;
    }
    else {
      console.log('GUARD - Closed');
      this.router.navigate(['/']);
      return false;
    }

    // var isAuth = this._authService.x_getUserLoggedIn();

    // if (localStorage.getItem('user')) {
    //   return true;
    // }

    // if (!isAuth) {
    //   console.log('You are not authenticated');
    //   this.router.navigate(['/']);
    // }

    // return isAuth;

  }

}
