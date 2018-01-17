import { Injectable } from '@angular/core';

import { _url } from './_shared';
import { SharedService } from './shared.service';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DesksService {

  url = _url + '/api/desks';

  constructor(
    private _http: Http,
    private _ss: SharedService
  ) { }

  // Получаем 1 доску по ID
  x_getDesk(id) {
    return this._http.get(this.url + '/desk/' + id, this._ss._headers())
      .map(res => res.json());
  }

  // Отдаем доски по ID секции родителя
  x_getDesks(section_id) {
    return this._http.get(this.url + '/section/' + section_id, this._ss._headers())
      .map(res => res.json());
  }

  // Создаем доску для ID секции родителя
  x_createDesk(data) {
    return this._http.post(this.url + '/create', data, this._ss._headers())
      .map(res => res.json());
  }

  // Сохраняем редактирование доски
  x_saveEdit(desk) {
    return this._http.put(this.url + '/edit', desk, this._ss._headers())
      .map(res => res.json());
  }

  x_deleteDesk(id) {
    return this._http.delete(this.url + '/delete/' + id, this._ss._headers())
      .map(res => res.json());
  }

}
