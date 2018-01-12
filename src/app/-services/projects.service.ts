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
  x_getCurrentProject(id) {
    return this._http.get(this.url + '/project/' + id, this._ss._headers())
      .map(res => res.json());
  }

  // Создаем проект
  x_createProject(newProject) {
    return this._http.post(this.url + '/project_add', newProject, this._ss._headers())
      .map(res => res.json());
  }

  saveEdit(data) {
    var DB = this.projectsDB;

    for (let i = 0; i < DB.length; i++) {
      if (DB[i].id == data.id) {

        DB[i].name = data.name;
        DB[i].description = data.description;
        DB[i].color = data.color;

        return {
          response: true,
          message: 'ProS Project ' + data.id + ' edit saved'
        }
      }
    }
    return {
      response: false,
      message: 'ProS Project ' + data.id + ' not saved / not found'
    }
  }

  deleteProject(id) {
    var DB = this.projectsDB;

    for (let i = 0; i < DB.length; i++) {
      if (DB[i].id == id) {
        DB.splice(i, 1);
        return {
          response: true,
          message: 'ProS Project ' + id + ' deleted'
        };
      }
    }
    return {
      response: false,
      message: 'ProS Project ' + id + ' not deleted / not found'
    };
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

  makeFav(P_ID, U_ID, e) {
    let DB = this.projectsDB;

    for (let i = 0; i < DB.length; i++) {
      if (DB[i].id == P_ID) {

        // Добавляем
        if (e) {
          this.projectsDB[i].userFavId.push(U_ID);
          console.log(this.projectsDB[i]);
          return {
            response: true,
            message: 'ProS Project ' + P_ID + ' added to user ' + U_ID + ' favs'
          }
        }

        // Удаляем
        else {
          let IDs = DB[i].userFavId;

          for (let j = 0; j < IDs.length; j++) {
            if (IDs[j] == U_ID) {
              this.projectsDB[i].userFavId.splice(j, 1);
              console.log(this.projectsDB[i]);
              return {
                response: true,
                message: 'ProS Project ' + P_ID + ' removed from user ' + U_ID + ' favs'
              }
            }
          }
        }

      }
    }
    return {
      response: false,
      message: 'ProS Project ' + P_ID + ' not found'
    }
  }

}
