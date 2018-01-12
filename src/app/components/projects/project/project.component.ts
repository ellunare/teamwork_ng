import { Component, OnInit } from '@angular/core';

import { ProjectsService } from '../../../-services/projects.service';
import { SectionsService } from '../../../-services/sections.service';
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
    private _sectionsService: SectionsService,
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
    this.x_initialise(this.id);
  }

  // Цвет проекта для верстки
  setColor() {
    return this.thisProject.color;
  }

  // Получаем проект
  x_initialise(id) {
    this._projectsService.x_getProject(id)
      .subscribe(res => {
        console.log(res.msg);
        if (res.success) {
          this.thisProject = res.data;
          this.wait = false;
          this.x_isFav();
        }
      });
  }

  x_isFav() {
    let user_id = this._usersService.getID();
    for (let i = 0; i < this.thisProject.userFavId.length; i++) {
      if (this.thisProject.userFavId[i] == user_id) {
        this.inFav = true;
        break;
      }
    }
  }

  // Переключатель формы редактирования
  toggleAddingMode() {
    this.edit_mode = !this.edit_mode
  }

  // Сохраняем редактирование
  x_saveEdit() {
    let data = {
      id: this.thisProject.id,
      name: this.thisProject.name,
      description: this.thisProject.description,
      color: this.thisProject.color
    }

    this._projectsService.x_saveEdit(data)
      .subscribe(res => {
        console.log(res.msg);
        if (res.success) {
          this.toggleAddingMode();
        }
      })
  }

  // Получаем цвет от палитры
  setTempColor(i, e) {
    this.thisProject.color = e;
  }

  close() {
    this.router.navigate(['dash']);
  }

  // Кнопка удалить проект
  x_deleteProject() {
    let flag = confirm('Sure?');
    if (flag) {
      // Удаляем проект
      this._projectsService.x_deleteProject(this.id)
        .subscribe(res => {
          console.log(res.msg);
          if (res.success) {

            // Удаляем дочерние секции
            this._sectionsService.x_deleteProjectSections(this.id)
              .subscribe(res => {
                console.log(res.msg);
                if (res.success) {
                  console.log('childsectionsdeleted');
                }
              });

            // Отдаем событие с ID в сервис для удаления проекта и в project list
            this._projectsService.emitProjectDeleted(this.id);
            this.close();
          }

        });
    }
  }

  x_makeFav(add) {
    let projectID = this.id;
    let userID = this._usersService.getID();

    this._projectsService.x_makeFav(projectID, userID, add)
      .subscribe(res => {
        console.log(res.msg);
      })
  }

}
