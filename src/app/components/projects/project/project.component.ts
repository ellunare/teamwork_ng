import { Component, OnInit } from '@angular/core';

import { ProjectsService } from '../../../-services/projects.service';
import { UsersService } from '../../../-services/users.service';

import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.sass']
})

export class ProjectComponent implements OnInit {

  thisProject;

  id;

  edit_mode = false;
  wait = false;

  inFav = false;

  constructor(
    private _projectsService: ProjectsService,
    private _usersService: UsersService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.wait = true;
    // В самом начале
    // Получаем id из маршрута
    this.activatedRoute.params
      .subscribe((values: { id: number }) => {
        this.id = values.id;
      })
    // После инициализируем проект
    this.initialise(this.id);
  }

  // Цвет проекта для верстки
  setColor() {
    return this.thisProject.color;
  }

  // Получаем проект
  initialise(id) {
    this._projectsService.x_getCurrentProject(id)
      .subscribe(res => {
        console.log(res.msg);
        if (res.success) {
          this.thisProject = res.data;
          this.wait = false;
          this.isFav();
        }
      });
  }

  isFav() {
    let flag = false;
    let user_id = this._usersService.getID();
    for (let i = 0; i < this.thisProject.userFavId.length; i++) {
      if (this.thisProject.userFavId[i] == user_id) {
        flag = true;
        break;
      }
    }
    if (flag) {
      console.log('--- In fav');
      this.inFav = true;
    }
    else {
      console.log('--- not in fav');
    }
  }

  // Переключатель формы редактирования
  toggleAddingMode() {
    this.edit_mode = !this.edit_mode
  }

  // Сохраняем редактирование
  saveEdit() {
    this.wait = true;

    let data = {
      id: this.thisProject.id,
      name: this.thisProject.name,
      description: this.thisProject.description,
      color: this.thisProject.color
    }

    let response = this._projectsService.saveEdit(data);

    console.log(response.message);
    if (response.response) {
      setTimeout(() => {
        this.wait = false;
        this.toggleAddingMode();
      }, 1000);
    }

  }

  // Получаем цвет от палитры
  setTempColor(i, e) {
    this.thisProject.color = e;
  }

  close() {
    this.router.navigate(['dash']);
  }

  // Кнопка удалить проект
  deleteProject() {
    this.wait = true;
    let response = this._projectsService.deleteProject(this.id);

    console.log(response.message);
    if (response.response) {
      setTimeout(() => {
        // Отдаем событие с ID в сервис для удаления проекта и в project list
        this._projectsService.emitProjectDeleted(this.id);
        this.wait = false;
        this.close();
      }, 1000);
    }
  }

  makeFav(e) {
    let projectID = this.id;
    let userID = this._usersService.getID();
    let response = this._projectsService.makeFav(projectID, userID, e);

    console.log(response.message);
    if (response.response) {
      this.inFav = true;
    }
    else {
      this.inFav = false;
    }
  }

}
