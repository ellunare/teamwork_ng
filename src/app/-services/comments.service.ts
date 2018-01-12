import { Injectable } from '@angular/core';

import { commentsDB } from '../-DB/comments.db';

@Injectable()
export class CommentsService {

  private commentsDB = commentsDB;

  private commentsGlobalId = this.commentsDB[this.commentsDB.length - 1].id + 1;

  constructor() { }

  // увеличение счетчика после создания комментария
  incrementTasksId() {
    this.commentsGlobalId++;
  }

  // Отдаем один комментарий по ID комента
  getComment(id) {
    let DB = this.commentsDB;

    for (let i = 0; i < DB.length; i++) {
      if (DB[i].id == id) {
        return {
          response: true,
          message: 'ComS Comment ' + id,
          data: DB[i]
        };
      }
    }
    return {
      response: false,
      message: 'ComS Comment ' + id + ' not found',
      data: {}
    };
  }

  // Отдаем комментарии по ID таска родителя
  getComments(id) {
    let DB = this.commentsDB;
    let __tempDB = [];

    for (let i = 0; i < DB.length; i++) {
      if (DB[i].parentTaskId == id) {
        __tempDB.push(DB[i]);
      }
    }
    if (__tempDB.length) {
      return {
        response: true,
        message: 'ComS Task ' + id + ' comments',
        data: __tempDB
      };
    }
    else {
      return {
        response: false,
        message: 'ComS Task ' + id + ' have no comments',
        data: []
      };
    }
  }

  createComment(data) {
    let new_comment = {
      id: this.commentsGlobalId,
      text: data.text,
      parentTaskId: data.parentTaskId,
      parentUserId: data.parentUserId
    }

    this.commentsDB.push(new_comment);
    this.incrementTasksId();

    return {
      response: true,
      message: 'ComS Comment ' + new_comment.id + ' created',
      data: new_comment
    };
  }

  saveEdit(comment) {
    let DB = this.commentsDB;

    for (let i = 0; i < DB.length; i++) {
      if (DB[i].id == comment.id) {
        DB[i] = comment;
        return {
          response: true,
          message: 'ComS Comment ' + comment.id + ' edit saved'
        };
      }
    }
    return {
      response: false,
      message: 'ComS Comment ' + comment.id + ' not edited / not found'
    };
  }

  deleteComment(comment) {
    let DB = this.commentsDB;

    for (let i = 0; i < DB.length; i++) {
      if (DB[i].id == comment.id) {
        DB.splice(i, 1);

        return {
          response: true,
          message: 'ComS Comment ' + comment.id + ' deleted'
        };
      }
    }
    return {
      response: false,
      message: 'ComS Comment ' + comment.id + ' not deleted / not found'
    };
  }

}
