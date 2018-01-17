import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

import { UsersService } from '../../../-services/users.service';
import { TeamsService } from '../../../-services/teams.service';

@Component({
  selector: 'team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.sass']
})

export class TeamComponent implements OnInit {

  teamUsers = [];

  @Input() id;
  @Input() name;
  @Output() team_deleted = new EventEmitter();

  add_user_mode = false;
  temp_email = '';

  _alert = '';

  constructor(
    private _usersService: UsersService,
    private _teamsService: TeamsService
  ) { }

  ngOnInit() {
    this._alert = '';
    this.x_getTeamUsers(this.id);
  }

  // Получаем пользователей в команду по id команды
  x_getTeamUsers(id) {
    this._usersService.x_getTeamUsers(id)
      .subscribe(res => {
        this.teamUsers = res.data;
      });
  }

  // Добавляем пользователя по email
  x_addUserByEmail(email) {
    if (!email) {
      // console.log('Write some email');
      this._alert = 'enter e-mail';
    }
    else {
      this._usersService.x_addUserToTeam(email, this.id)
        .subscribe(res => {
          if (res.success) {
            this._alert ='';
            this.temp_email = '';
            this.toggleAddingMode();
            this.teamUsers.push(res.data);
          }
          else {
            this._alert = res.msg;
          }
        });
    }
  }

  // Удаляем из команды по Id пользователя
  x_deleteFromTeam(user_id, team_id, e) {
    e.preventDefault();
    let flag = confirm('Sure?');
    if (flag) {
      // Удаляем пользователя
      this._usersService.x_deleteFromTeam(user_id, team_id)
        .subscribe(res => {
          this.x_deleteFromTeamLocal(user_id);
        });
    }
  }

  // На клиенте - удаляем из массива
  x_deleteFromTeamLocal(id) {
    let DB = this.teamUsers;
    for (let i = 0; i < DB.length; i++) {
      if (DB[i].id == id) {
        this.teamUsers.splice(i, 1);
      }
    }
  }

  // Удаляем команду
  x_deleteTeam(team_id, e) {
    e.preventDefault();
    let flag = confirm('Sure?');

    if (flag) {
      this._teamsService.x_deleteTeam(team_id)
        .subscribe(res => {
          // console.log(res.msg);
          if (res.success) {
            this.team_deleted.emit(team_id);
          }
        });
    }

  }

  // Переключатель формы добавления пользователья в команду
  toggleAddingMode() {
    this._alert ='';
    this.temp_email = '';
    this.add_user_mode = !this.add_user_mode
  }

}
