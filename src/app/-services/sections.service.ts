import { Injectable } from '@angular/core';

import { SharedService } from './shared.service';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

import { sectionsDB, sectionsDB_DEF } from '../-DB/sections.db';

@Injectable()
export class SectionsService {

  url = 'http://127.0.0.1:3000/api/sections';

  private sectionsDB = sectionsDB;
  private DB_DEF = sectionsDB_DEF;

  private sectionsGlobalId = this.sectionsDB[this.sectionsDB.length - 1].id + 1;

  constructor(
    private _http: Http,
    private _ss: SharedService
  ) { }

  // увеличение счетчика после создания раздела
  incrementSectionsId() {
    this.sectionsGlobalId++;
  }

  // Получаем одну секцию по ID
  getSection(id) {
    let DB = this.sectionsDB;

    for (let i = 0; i < DB.length; i++) {
      if (DB[i].id == id) {
        return {
          response: true,
          message: 'SecS Section ' + id,
          data: DB[i]
        };
      }
    }
    return {
      response: false,
      message: 'SecS Section ' + id + ' not found',
      data: null
    };
  }

  // Отдаем массив секций по ID родительского проекта
  x_getSections(project_id) {
    return this._http.get(this.url + '/sections/project/' + project_id, this._ss._headers())
      .map(res => res.json());
    // let DB = this.sectionsDB;

    // let __tempDB = [];
    // for (let i = 0; i < DB.length; i++) {
    //   if (DB[i].parentProjectId == id) {
    //     __tempDB.push(DB[i]);
    //   }
    // }
    // if (__tempDB.length) {
    //   return {
    //     response: true,
    //     message: 'SecS Project ' + id + ' sections',
    //     data: __tempDB
    //   };
    // }
    // else {
    //   return {
    //     response: false,
    //     message: 'SecS Project ' + id + ' have no sections',
    //     data: null
    //   };
    // }

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
  createSection(data) {
    let new_section = {
      id: this.sectionsGlobalId,
      name: data.name,
      description: data.description,
      parentProjectId: data.parent
    }
    this.sectionsDB.push(new_section);
    this.incrementSectionsId();
    return {
      response: true,
      message: 'SecS Section ' + new_section.id + ' created'
    };
  }

  // Сохраняем редактирование секции
  saveEdit(section) {
    let DB = this.sectionsDB;

    for (let i = 0; i < DB.length; i++) {
      if (DB[i].id == section.id) {
        this.sectionsDB[i].name = section.name;
        this.sectionsDB[i].description = section.description;
        return {
          response: true,
          message: 'SecS Section ' + section.id + ' edits saved'
        };
      }
    }
    return {
      response: false,
      message: 'SecS Section ' + section.id + ' not saved / not found'
    };
  }

  // Удаляем секцию по ID
  deleteSection(id) {
    let DB = this.sectionsDB;

    for (let i = 0; i < DB.length; i++) {
      if (DB[i].id == id) {
        this.sectionsDB.splice(i, 1);
        return {
          response: true,
          message: 'SecS Section ' + id + ' deleted'
        };
      }
    }
    return {
      response: false,
      message: 'SecS Section ' + id + ' not deleted / not found'
    };
  }
}

