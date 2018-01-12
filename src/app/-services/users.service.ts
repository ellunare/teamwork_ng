import { Injectable } from '@angular/core';

import { SharedService } from './shared.service';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UsersService {

  url = 'http://127.0.0.1:3000/api/users';

  // ID активного пользователя
  private ID;

  constructor(
    private _http: Http,
    private _ss: SharedService
  ) { }

  getID() {
    // Если перезагружаем страницу то ID берем в storage
    if (!this.ID) {
      this.ID = JSON.parse(localStorage.getItem('user')).id;
    }
    return this.ID;
  }

  x_getUserInfo(id) {
    return this._http.get(this.url + '/user/' + id, this._ss._headers())
      .map(res => res.json());
  }

  x_getTeamUsers(team_id) {
    return this._http.get(this.url + '/team_users/' + team_id, this._ss._headers())
      .map(res => res.json());
  }

  x_deleteFromTeam(user_id, team_id) {
    let body = {
      user_id: user_id,
      team_id: team_id
    }
    return this._http.put(this.url + '/delete_from_team', body, this._ss._headers())
      .map(res => res.json());
  }

  x_addUserToTeam(email, team_id) {
    let body = {
      email: email,
      team_id: team_id
    }
    return this._http.put(this.url + '/add_to_team', body, this._ss._headers())
      .map(res => res.json());
  }

  // // Удаляем у пользователе принадлежность к удаленной ID команде, только что
  // deleteFromDeletedTeam(id) {
  //   let DB = this.usersDB;
  //   let flag = false;

  //   for (let i = 0; i < DB.length; i++) {
  //     if (DB[i].parentTeamId == id) {
  //       this.usersDB[i].parentTeamId = -1;
  //       flag = true;
  //     }
  //   }
  //   if (flag) {
  //     return {
  //       response: true,
  //       message: 'UseS Users have been deleted from team ' + id
  //     };
  //   }
  //   else {
  //     return {
  //       response: false,
  //       message: 'UseS Team ' + id + ' has no users'
  //     };
  //   }
  // }

}
