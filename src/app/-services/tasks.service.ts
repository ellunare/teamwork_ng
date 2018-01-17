import { Injectable } from '@angular/core';

import { _url } from './_shared';
import { SharedService } from './shared.service';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class TasksService {

  url = _url + '/api/tasks';

  constructor(
    private _http: Http,
    private _ss: SharedService
  ) { }

  // Отдаем таски по ID родительской доски
  x_getTasks(desk_id) {
    return this._http.get(this.url + '/desk/' + desk_id, this._ss._headers())
      .map(res => res.json());
  }

  // Отдаем таск по его ID
  x_getTask(id) {
    return this._http.get(this.url + '/task/' + id, this._ss._headers())
      .map(res => res.json());
  }

  // Создаем таск и возвращаем его глобальный ID
  x_createTask(new_task) {
    return this._http.post(this.url + '/create', new_task, this._ss._headers())
      .map(res => res.json());
  }

  // Редактируем таск
  x_saveEdit(data) {
    return this._http.put(this.url + '/edit', data, this._ss._headers())
      .map(res => res.json());
  }

  // Удаляем таск по его ID
  x_deleteTask(id) {
    return this._http.delete(this.url + '/delete/' + id, this._ss._headers())
      .map(res => res.json());
  }

  // Сохраняем ID родителей родительской доски
  // // при удалении таска для правильной редирекции в доску
  parentsID = {
    p: 0,
    s: 0
  };
  storeParentsIds(p, s) {
    this.parentsID.p = p;
    this.parentsID.s = s;
  }

  // Shared сервис
  // Для удаления таска в родительской доске
  private taskDeleted = new Subject<any>();
  taskDeletedEmitted = this.taskDeleted.asObservable();
  emitTaskDeleted(change: any) {
    this.taskDeleted.next(change);
  }

}
