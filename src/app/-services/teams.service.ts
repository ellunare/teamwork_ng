import { Injectable } from '@angular/core';

import { _url } from './_shared';
import { SharedService } from './shared.service';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class TeamsService {

  url = _url + '/api/teams';
  
  constructor(
    private _http: Http,
    private _ss: SharedService
  ) { }

  // отдаем команды из БД
  x_getTeams() {
    return this._http.get(this.url + '/teams', this._ss._headers())
      .map(res => res.json());
  }

  // Создаем команду с именем
  x_createTeam(new_team_name) {
    let body = {
      name: new_team_name
    }
    return this._http.post(this.url + '/team_add', body, this._ss._headers())
      .map(res => res.json());
  }

  // Удаляем команду по ID
  x_deleteTeam(id) {
    return this._http.delete(this.url + '/team/' + id, this._ss._headers())
      .map(res => res.json());
  }

}
