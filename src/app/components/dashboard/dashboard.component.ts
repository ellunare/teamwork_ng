import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../-services/auth.service';
import { ProjectsService } from '../../-services/projects.service';
import { UsersService } from '../../-services/users.service';

import { Router } from '@angular/router';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})

export class DashboardComponent implements OnInit {

  activeUser: any = {};

  projectsTeamId;
  projectToShow;

  currentProject;

  constructor(
    private _authService: AuthService,
    private _projectsService: ProjectsService,
    private _usersService: UsersService,
    private router: Router
  ) { }

  render_active_user = false;

  ngOnInit() {
    this.x_getActiveUser();
  }

  // Получаем инфу об активном пользователе
  x_getActiveUser() {
    this._usersService.x_getUserInfo(this._usersService.getID())
      .subscribe(res => {
        // console.log(res.msg);
        if (res.success) {
          this.activeUser = res.data;
          this.render_active_user = true;
        }
      });
  }

  // Ловим team Id из Team-list и сохраняем в dashboard
  // Project - list получает его как Input
  setProjectsTeamId(e) {
    this.projectsTeamId = e;
  }

  // Кликнули на проект в списке и в dashboard вызывем переход
  // Переходим по ссылке
  setProjectToShow(e) {
    // Переходим по новой ссылке
    this.router.navigate(['dash']);
    setTimeout(() => {
      this.router.navigate([
        'dash',
        'project', e
      ]);
    }, 0);
  }

  // Информация о текущем проекте для использования в dashboard компонентах
  getCurrentProject(id) {
    this._projectsService.x_getProject(id)
      .subscribe(res => {
        // console.log(res.msg);
        if (res.success) {
          this.currentProject = res.data;
        }
      });
  }

  onLogoutClick(e) {
    e.preventDefault();
    this._authService.x_setUserLoggedOut();
    this.router.navigate(['login']);
    return false;
  }

}
