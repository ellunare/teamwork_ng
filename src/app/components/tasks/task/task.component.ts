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

  id;

  this_task;
  comments = [];

  wait = false;

  mode = {
    add_comment: true,
    edit_task: false
  }

  temp_comment_value = '';

  constructor(
    private tasksService: TasksService,
    private _commentsService: CommentsService,
    private usersService: UsersService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.wait = true;
    this.activatedRoute.params
      .subscribe(params =>
        this.id = parseInt(params.id));
    this.getTask()
    this.x_getComments();
    this.___scrollToBottom();
  }

  ngAfterViewChecked() {
    this.___scrollToBottom();
  }

  ___scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
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

  getTask() {
    let response = this.tasksService.getTask(this.id);

    // console.log(response.message);
    if (response.response) {
      this.this_task = response.data;
    }
  }

  saveEdit() {
    let data = {
      id: this.id,
      line: this.this_task.line,
      parentDeskId: this.this_task.parentDeskId
    }
    let response = this.tasksService.saveEdit(data);

    // console.log(response.message);
    if (response.response) {
      this.toggleMode('edit_task');
    }
  }

  deleteTask() {
    let response = this.tasksService.deleteTask(this.id);

    // console.log(response.message);
    if (response.response) {
      setTimeout(() => {
        // Отдаем в событие сервиса ID для удаления таска и в досках
        this.tasksService.emitTaskDeleted(this.id);
        this.parentRoute();
      }, 500);
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

  createComment() {
    if (!this.temp_comment_value) {
      console.log('Write some');
    }
    else {
      // this.wait = true;

      let data = {
        text: this.temp_comment_value,
        parentTaskId: this.id,
        parentUserId: this.usersService.getID()
      }

      let response = this._commentsService.createComment(data);

      // console.log(response.message);
      if (response.response) {
        setTimeout(() => {
          // this.wait = false
          this.toggleMode('add_comment');
          // На клиенте - пушим в массив
          this.comments.push(response.data);
        }, 1000);
      }
    }
  }

  // На клиенте - удаляем коммент
  deleteComment(i, e) {
    for (let i = 0; i < this.comments.length; i++) {
      if (this.comments[i].id == e.id) {
        this.comments.splice(i, 1);
      }
    }
  }

  // Уходим назад в доску
  parentRoute() {
    this.router.navigate([
      'dash',
      'project',
      this.tasksService.parentsID.p,
      'section',
      this.tasksService.parentsID.s,
      'desk',
      this.this_task.parentDeskId
    ]);
  }

}
