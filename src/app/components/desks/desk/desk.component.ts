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

  constructor(
    private desksService: DesksService,
    private tasksService: TasksService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    // Подписываемся на удаление таска, чтобы удалить его в массиве доски
    tasksService.taskDeletedEmitted.subscribe(
      id => {
        this.deleteTaskFromList(id);
      });
  }

  ngOnInit() {
    // Извлекаем ID родителей
    this.parentRoute();
    // Оопределяем свой id
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.getDesk();
    this.getTasks();
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
  getDesk() {
    let response = this.desksService.getDesk(this.id);

    console.log(response.message);
    if (response.response) {
      this.this_desk = response.data;
    }
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
    this.tasksService.storeParentsIds(this.id_p, this.id_s);
  }

  // Сохраняем редактирование в доске
  saveEdit() {
    if (this.current_line == this.this_desk.line) {
      console.log('Line is not edited');
    }
    else {
      let response = this.desksService.saveEdit(this.this_desk);

      console.log(response.message);
      if (response.response) {
        this.toggleMode('edit_desk');
      }
    }
  }

  // Удаляем доску
  deleteDesk() {
    let response = this.desksService.deleteDesk(this.id);

    console.log(response.message);
    if (response.response) {
      setTimeout(() => {
        this.goBack();
      }, 500);
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
  getTasks() {
    let response = this.tasksService.getTasks(this.id);

    console.log(response.message);
    if (response.response) {
      this.tasks = response.data;
    }
  }

  // Создаем таск и переходим в него
  createTask() {
    this.wait.task = true;

    let task = {
      id: -999,
      line: this.temp_task_line,
      parentDeskId: this.id
    }

    let response = this.tasksService.createTask(task);

    console.log(response.message);
    if (response.response) {
      this.toggleMode('add_task');
      setTimeout(() => {
        // Получаем global ID таска и присваиваем его временному таску
        task.id = response.data;
        // На клиенте - добавляем таск в маасив доски
        this.tasks.push(task);
        this.wait.task = false;

        // Переходим в созданный таск
        this.goToTask(task.id);
      }, 1000);
    }
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

  // Удаляем таск в доске -> массиве тасков
  // От shared сервиса
  deleteTaskFromList(id) {
    for (let i = 0; i < this.tasks.length; i++) {
      if (this.tasks[i].id == id) {
        this.tasks.splice(i, 1);
      }
    }
  }

}