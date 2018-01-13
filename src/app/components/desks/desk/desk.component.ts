import { Component, OnInit } from '@angular/core';

import { DesksService } from '../../../-services/desks.service';
import { TasksService } from '../../../-services/tasks.service';

import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'desk',
  templateUrl: './desk.component.html',
  styleUrls: ['./desk.component.sass']
})

export class DeskComponent implements OnInit {

  // Эта доска
  id;
  this_desk;

  // Родители
  id_p;
  id_s;

  tasks = [];

  wait = {
    task: false,
    desk_delete: false,
    desk_edit: false
  }

  mode = {
    add_task: false,
    edit_desk: false
  }

  temp_task_line = '';
  // Для валидации
  current_line;

  render = false;

  constructor(
    private _desksService: DesksService,
    private _tasksService: TasksService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    // Подписываемся на удаление таска, чтобы удалить его в массиве доски
    _tasksService.taskDeletedEmitted.subscribe(
      id => {
        this.deleteTaskFromList(id);
      });
  }

  ngOnInit() {
    this.render = false;
    // Извлекаем ID родителей
    this.parentRoute();
    // Оопределяем свой id
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.x_getDesk();
    this.x_getTasks();
  }

  // Переключатель режима
  toggleMode(mode) {
    // Создаем таск
    if (mode == 'add_task') {
      this.temp_task_line = '';
      this.mode.add_task = !this.mode.add_task;
    }
    // Редактируем доску
    if (mode == 'edit_desk') {
      // Запоминаем текущий текст
      this.current_line = this.this_desk.line;
      this.mode.edit_desk = !this.mode.edit_desk;
    }
  }

  // Получаем инфу о текущей доске
  x_getDesk() {
    this._desksService.x_getDesk(this.id)
      .subscribe(res => {
        // console.log(res.msg);
        if (res.success) {
          this.this_desk = res.data;
        }
      });
  }

  parentRoute() {
    // Извлекаем из URL id проекта и секции
    // Для навигации
    let route = this.activatedRoute.snapshot.url;

    for (let i = 0; i < route.length; i++) {
      if (route[i].path == 'project') {
        this.id_p = parseInt(route[i + 1].path);
      }
      if (route[i].path == 'section') {
        this.id_s = parseInt(route[i + 1].path);
      }
    }
    // Отдаем в TaskService для возврата в тасках при удалении
    this._tasksService.storeParentsIds(this.id_p, this.id_s);
  }

  // Сохраняем редактирование в доске
  x_saveEdit() {
    if (this.current_line == this.this_desk.line) {
      console.log('Line is not edited');
    }
    else {
      this._desksService.x_saveEdit(this.this_desk)
        .subscribe(res => {
          // console.log(res.msg);
          if (res.success) {
            this.toggleMode('edit_desk');
          }
        });
    }
  }

  // Удаляем доску
  x_deleteDesk() {
    let flag = confirm('Sure?');
    if (flag) {
      // Удаляем доску
      this._desksService.x_deleteDesk(this.id)
        .subscribe(res => {
          // console.log(res.msg);
          if (res.success) {
            this.goBack();
          }
        });
    }
  }

  // Возвращаемся назад
  goBack() {
    this.router.navigate([
      'dash',
      'project', this.id_p,
      'section', this.id_s
    ]);
  }

  // Получаем все таски по ID доски родителя
  x_getTasks() {
    this._tasksService.x_getTasks(this.id)
      .subscribe(res => {
        // console.log(res.msg);
        if (res.success) {
          this.tasks = res.data;
        }
        setTimeout(() => {
          this.render = true;
        }, 0);
      });
  }

  // Создаем таск и переходим в него
  x_createTask() {
    let new_task = {
      id: -999,
      line: this.temp_task_line,
      parentDeskId: this.id
    }
    this._tasksService.x_createTask(new_task)
      .subscribe(res => {
        // console.log(res.msg);
        if (res.success) {
          // Получаем global ID таска и присваиваем его временному таску
          new_task.id = res.data.id;
          // На клиенте - добавляем таск в маасив доски
          this.tasks.push(new_task);
          // Переходим в созданный таск
          this.goToTask(new_task.id);
        }
        this.toggleMode('add_task');
      });
  }

  // Переходим в дочерний таск
  goToTask(task_id) {
    this.router.navigate([
      'dash',
      'project', this.id_p,
      'section', this.id_s,
      'desk', this.id
    ]);
    setTimeout(() => {
      this.router.navigate([
        'dash',
        'project', this.id_p,
        'section', this.id_s,
        'desk', this.id,
        'task', task_id
      ]);
    }, 0)
  }

  // На клиенте Удаляем таск в доске -> массиве тасков
  // От shared сервиса
  deleteTaskFromList(id) {
    for (let i = 0; i < this.tasks.length; i++) {
      if (this.tasks[i].id == id) {
        this.tasks.splice(i, 1);
      }
    }
  }

}