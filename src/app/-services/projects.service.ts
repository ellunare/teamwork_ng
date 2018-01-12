import { Injectable } from '@angular/core';

import { SharedService } from './shared.service';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

import { projectsDB, project } from '../-DB/projects.db';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ProjectsService {

  url = 'http://127.0.0.1:3000/api/projects';

  private projectsDB = projectsDB;

  constructor(
    private _http: Http,
    private _ss: SharedService
  ) { }

  // отдаем проекты для ID команды из БД
  x_getProjects(team_id) {
    return this._http.get(this.url + '/projects/' + team_id, this._ss._headers())
      .map(res => res.json());
  }

  // Отдаем 1 проект по его ID 
  x_getProject(id) {
    return this._http.get(this.url + '/project/' + id, this._ss._headers())
      .map(res => res.json());
  }

  // Создаем проект
  x_createProject(newProject) {
    return this._http.post(this.url + '/project_add', newProject, this._ss._headers())
      .map(res => res.json());
  }

  x_saveEdit(data) {
    return this._http.put(this.url + '/edit/' + data.id, data, this._ss._headers())
      .map(res => res.json());
  }

  x_deleteProject(id) {
    return this._http.delete(this.url + '/delete/' + id, this._ss._headers())
      .map(res => res.json());
  }

  // Shared сервис
  // Для передачи ID Удаленного проекта
  private projectDeleted = new Subject<any>();
  projectDeletedEmitted = this.projectDeleted.asObservable();
  emitProjectDeleted(id: any) {
    this.projectDeleted.next(id);
  }

  getColor(id) {
    let DB = this.projectsDB;
    for (let i = 0; i < DB.length; i++) {
      if (DB[i].id == id) {
        let c = DB[i].color.toString();
        return c;
      }
    }
  }

  x_makeFav(P_ID, U_ID, add) {
    let body = {
      p_id: P_ID,
      u_id: U_ID,
      add: add
    }
    return this._http.put(this.url + '/makefav', body, this._ss._headers())
      .map(res => res.json());
  }
  
}
