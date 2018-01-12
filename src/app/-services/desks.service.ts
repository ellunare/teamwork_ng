import { Injectable } from '@angular/core';

import { desksDB } from '../-DB/desks.db';

@Injectable()
export class DesksService {

  private desksDB = desksDB;

  private desksGlobalId = this.desksDB[this.desksDB.length - 1].id + 1;

  constructor() { }

  // увеличение счетчика после создания доска
  incrementDesksId() {
    this.desksGlobalId++;
  }

  // Получаем одну доску по ID
  getDesk(id) {
    let DB = this.desksDB;

    for (let i = 0; i < DB.length; i++) {
      if (DB[i].id == id) {
        return {
          response: true,
          message: 'DesS Desk ' + id,
          data: DB[i]
        };
      }
    }
    return {
      response: false,
      message: 'DesS Desk ' + id + ' not found',
      data: null
    };
  }

  // Отдаем доски по ID секции родителя
  getDesks(id) {
    let DB = this.desksDB;
    let __tempDB = [];

    for (let i = 0; i < DB.length; i++) {
      if (DB[i].parentSectionId == id) {
        __tempDB.push(DB[i]);
      }
    }
    if (__tempDB.length) {
      return {
        response: true,
        message: 'DesS Section ' + id + ' desks',
        data: __tempDB
      };
    }
    else {
      return {
        response: false,
        message: 'DesS No desks for section ' + id,
        data: []
      };
    }
  }

  // Создаем доску для ID секции родителя
  createDesk(data) {
    let new_desk = {
      id: this.desksGlobalId,
      line: data.line,
      parentSectionId: data.parentSectionId
    }

    this.desksDB.push(new_desk);
    this.incrementDesksId();

    return {
      response: true,
      message: 'DesS Desk ' + new_desk.id + ' has been added',
      id: new_desk.id
    };
  }

  // Сохраняем редактирование доски
  saveEdit(desk) {
    let DB = this.desksDB;

    for (let i = 0; i < DB.length; i++) {
      if (DB[i].id == desk.id) {
        this.desksDB[i] = desk;
        return {
          response: true,
          message: 'DesS Desk ' + desk.id + ' edit saved'
        };
      }
    }
    return {
      response: false,
      message: 'DesS Desk ' + desk.id + ' not edited / not found'
    };
  }

  deleteDesk(id) {
    let DB = this.desksDB;

    for (let i = 0; i < DB.length; i++) {
      if (DB[i].id == id) {
        this.desksDB.splice(i, 1);
        return {
          response: true,
          message: 'DesS Desk ' + id + ' deleted'
        };
      }
    }
    return {
      response: false,
      message: 'DesS Desk ' + id + ' not deleted / not found'
    };
  }

}
