import { Injectable } from '@angular/core';

import { _url } from './_shared';
import { SharedService } from './shared.service';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class SectionsService {

  url = _url + '/api/sections';

  constructor(
    private _http: Http,
    private _ss: SharedService
  ) { }

  // Получаем одну секцию по ID
  x_getSection(id) {
    return this._http.get(this.url + '/one/' + id, this._ss._headers())
      .map(res => res.json());
  }

  // Отдаем массив секций по ID родительского проекта
  x_getSections(project_id) {
    return this._http.get(this.url + '/project/' + project_id, this._ss._headers())
      .map(res => res.json());
  }

  // Создаем 3 стандартные секции у нового проекта
  x_initialiseProject(project_id) {
    let body = {
      id: project_id
    }
    return this._http.post(this.url + '/sections_init', body, this._ss._headers())
      .map(res => res.json());
  }

  // Создаем секцию
  x_createSection(data) {
    return this._http.post(this.url + '/create', data, this._ss._headers())
      .map(res => res.json());
  }

  // Сохраняем редактирование секции
  x_saveEdit(section) {
    return this._http.put(this.url + '/edit', section, this._ss._headers())
      .map(res => res.json());
  }

  // Удаляем секцию по ID
  x_deleteSection(id) {
    return this._http.delete(this.url + '/delete/' + id, this._ss._headers())
      .map(res => res.json());
  }

  x_deleteProjectSections(project_id) {
    return this._http.delete(this.url + '/delete/project/' + project_id, this._ss._headers())
      .map(res => res.json());
  }

}

