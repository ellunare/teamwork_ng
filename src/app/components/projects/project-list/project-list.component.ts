import {
  Component,
  OnInit,
  OnChanges,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

import { ProjectsService } from '../../../-services/projects.service';
import { SectionsService } from '../../../-services/sections.service';

import { Router } from '@angular/router';

@Component({
  selector: 'project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.sass']
})

export class ProjectListComponent implements OnInit, OnChanges {

  @Input() teamId;

  projects = [];

  wait = false;
  add_project_mode = false;

  temp_name = '';
  temp_description = '';
  temp_color = '#918f62';

  _alert = '';

  @Output() ProjectId = new EventEmitter();

  constructor(
    private _projectsService: ProjectsService,
    private _sectionsService: SectionsService,
    private router: Router
  ) {
    // Подписываемся на ID удаленного проекта
    this._projectsService.projectDeletedEmitted.subscribe(
      id => {
        // Удаляем project из списка
        this.deleteProjectFromList(id);
      }
    );
  }

  ngOnChanges() {
    this._alert = '';
    if (this.teamId) {
      this.x_getProjects(this.teamId);
    }
  }

  ngOnInit() {
  }

  // Переключатель формы добавления проекта команде
  toggleAddingMode() {
    this._alert = '';
    this.add_project_mode = !this.add_project_mode
    this.temp_name = '';
    this.temp_description = '';
  }

  // Получаем проекты для команды по её Id
  x_getProjects(team_id) {
    this._projectsService.x_getProjects(team_id)
      .subscribe(res => {
        this.projects = [];
        // console.log(res.msg);
        if (res.success) {
          this.projects = res.data;
        }
      });
  }

  // Отправляем в dashboard id проекта для последующего открытия в главном экране
  sendIdOfProject(project_id) {
    this.ProjectId.emit(project_id);
  }

  // Создаем новый проект
  x_createProject() {
    // Валидность инпутов
    if (!this.temp_name || !this.temp_description) {
      // console.log('Write project info');
      this._alert = 'enter project info';
    }
    else {
      // this.wait = true;

      let new_project = {
        id: -999,
        name: this.temp_name,
        description: this.temp_description,
        color: this.temp_color,
        parentTeamId: this.teamId
      }

      // Создаем новый проект
      this._projectsService.x_createProject(new_project)
        .subscribe(res => {
          // console.log(res.msg);
          if (res.success) {

            let return_project = res.data;
            // После, инициализируем его 3мя секциями
            this._sectionsService.x_initialiseProject(res.data.id)
              .subscribe(res => {
                // console.log(res.msg);
                if (res.success) {
                  this._alert = '';

                  this.toggleAddingMode();
                  // На клиенте - пушим в текущий список
                  this.projects.push(return_project);

                  // Отдаем в DashBoard ID нового проекта и переходим в него
                  this.sendIdOfProject(return_project.id);
                }
              })
          }
        });
    }
  }

  // Ловим цвет из палитры
  setTempColor(i, e) {
    this.temp_color = e;
  }

  // На клиенте - удаляем проект в листе проектов
  deleteProjectFromList(id) {
    let DB = this.projects;
    for (let i = 0; i < DB.length; i++) {
      if (DB[i].id == id) {
        this.projects.splice(i, 1);
      }
    }
  }

}
