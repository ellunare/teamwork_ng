import { Injectable } from '@angular/core';

import { tasksDB } from '../-DB/tasks.db';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class TasksService {

  private tasksDB = tasksDB;

  private tasksGlobalId = this.tasksDB[this.tasksDB.length - 1].id + 1;

  constructor() { }

  // увеличение счетчика после создания таска
  incrementTasksId() {
    this.tasksGlobalId++;
  }

  // Отдаем таски по ID родительской доски
  getTasks(id) {
    let DB = this.tasksDB;
    let __tempDB = [];

    for (let i = 0; i < DB.length; i++) {
      if (DB[i].parentDeskId == id) {
        __tempDB.push(DB[i]);
      }
    }
    if (__tempDB.length) {
      return {
        response: true,
        message: 'TasS Desk ' + id + ' tasks',
        data: __tempDB
      };
    }
    else {
      return {
        response: false,
        message: 'TasS Desk ' + id + ' have no tasks',
        data: []
      };
    }
  }

  // Отдаем таск по его ID
  getTask(id) {
    let DB = this.tasksDB;

    for (let i = 0; i < DB.length; i++) {
      if (DB[i].id == id) {
        return {
          response: true,
          message: 'TasS Task ' + id,
          data: DB[i]
        };
      }
    }
    return {
      response: false,
      message: 'TasS Task ' + id + ' not found',
      data: []
    };
  }

  // Создаем таск и возвращаем его глобальный ID
  createTask(data) {
    let new_task = data;
    new_task.id = this.tasksGlobalId;
    this.tasksDB.push(new_task);
    this.incrementTasksId();

    return {
      response: true,
      message: 'TasS Task ' + new_task.id + ' created',
      data: new_task.id
    };
  }

  // Редактируем таск
  saveEdit(data) {
    for (let i = 0; i < this.tasksDB.length; i++) {
      if (this.tasksDB[i].id == data.id) {
        this.tasksDB[i] = data;
        return {
          response: true,
          message: 'TasS Task ' + data.id + ' edits saved'
        };
      }
    }
    return {
      response: false,
      message: 'TasS Task ' + data.id + ' not edited / not found'
    };
  }

  // Удаляем таск по его ID
  deleteTask(id) {
    let DB = this.tasksDB;

    for (let i = 0; i < DB.length; i++) {
      if (DB[i].id == id) {
        this.tasksDB.splice(i, 1);
        return {
          response: true,
          message: 'TasS Task ' + id + ' deleted'
        };
      }
    }
    return {
      response: false,
      message: 'TasS Task ' + id + ' not deleted / not found'
    };
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
