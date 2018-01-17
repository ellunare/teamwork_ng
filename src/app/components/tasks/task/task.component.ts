import { Component, OnInit } from '@angular/core';

import { TasksService } from '../../../-services/tasks.service';
import { CommentsService } from '../../../-services/comments.service';
import { UsersService } from '../../../-services/users.service';

import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { AfterViewChecked, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.sass']
})

export class TaskComponent implements OnInit, AfterViewChecked {

  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  scroll_blocked = false;

  id;

  this_task;
  comments = [];

  wait = false;

  mode = {
    add_comment: true,
    edit_task: false
  }

  temp_comment_value = '';

  render = false;

  constructor(
    private _tasksService: TasksService,
    private _commentsService: CommentsService,
    private usersService: UsersService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.scroll_blocked = false;
    this.render = false;
    this.wait = true;
    this.activatedRoute.params
      .subscribe(params =>
        this.id = parseInt(params.id));
    this.x_getTask()
    this.x_getComments();
    this.___scrollToBottom();
  }

  ngAfterViewChecked() {
    this.___scrollToBottom();
  }

  ___scrollToBottom(): void {
    if (!this.scroll_blocked) {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    }
  }

  ___block_scroll(e) {
    this.scroll_blocked = e;
  }

  // Переключатель формы добавления комментария таску
  toggleMode(mode) {
    if (mode == 'add_comment') {
      this.temp_comment_value = '';
      this.mode.add_comment = !this.mode.add_comment
    }
    if (mode == 'edit_task') {
      this.mode.edit_task = !this.mode.edit_task
    }
  }

  x_getTask() {
    this._tasksService.x_getTask(this.id)
      .subscribe(res => {
        // console.log(res.msg);
        if (res.success) {
          this.this_task = res.data;
        }
        else {
          this.router.navigate([
            'error'
          ]);
        }
        this.render = true;
      });
  }

  x_saveEdit() {
    let data = {
      id: this.id,
      line: this.this_task.line,
      parentDeskId: this.this_task.parentDeskId
    }
    this._tasksService.x_saveEdit(data)
      .subscribe(res => {
        // console.log(res.msg);
        if (res.success) {
          this.toggleMode('edit_task');
        }
      });
  }

  x_deleteTask() {
    let flag = confirm('Sure?');
    if (flag) {
      // Удаляем таск
      this._tasksService.x_deleteTask(this.id)
        .subscribe(res => {
          console.log(res.msg);
          if (res.success) {
            // Отдаем в событие сервиса ID для удаления таска и в досках
            this._tasksService.emitTaskDeleted(this.id);
            this.parentRoute();
          }
        });
    }
  }

  x_getComments() {
    this._commentsService.x_getComments(this.id)
      .subscribe(res => {
        // console.log(res.msg);
        if (res.success) {
          this.comments = res.data;
        }
        this.wait = false;
      });
  }

  x_createComment() {
    if (!this.temp_comment_value) {
      console.log('Write some');
    }
    else {
      let data = {
        text: this.temp_comment_value,
        parentTaskId: this.id,
        parentUserId: this.usersService.getID()
      }

      this._commentsService.x_createComment(data)
        .subscribe(res => {
          // console.log(res.msg);
          if (res.success) {
            this.toggleMode('add_comment');
            this.comments.push(res.data);
          }
        });
    }
  }

  // На клиенте - удаляем коммент
  deleteComment(id) {
    for (let i = 0; i < this.comments.length; i++) {
      if (this.comments[i].id == id) {
        this.comments.splice(i, 1);
      }
    }
  }

  // Уходим назад в доску
  parentRoute() {
    this.router.navigate([
      'dash',
      'project',
      this._tasksService.parentsID.p,
      'section',
      this._tasksService.parentsID.s,
      'desk',
      this.this_task.parentDeskId
    ]);
  }

}
