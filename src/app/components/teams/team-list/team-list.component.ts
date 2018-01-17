import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

import { TeamsService } from '../../../-services/teams.service';

@Component({
  selector: 'team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.sass'],
  providers: [TeamsService]
})
export class TeamListComponent implements OnInit {

  teams = [];

  add_team_mode = false;
  temp_team_name = '';

  @Output() TeamId = new EventEmitter();

  constructor(
    private _teamsService: TeamsService
  ) { }

  ngOnInit() {
    this.x_getTeams();
  }

  // Получаем все команды через сервис
  x_getTeams() {
    this._teamsService.x_getTeams()
      .subscribe(res => {
        this.teams = res.data;
      });
  }

  // Переключатель формы добавления пользователья в команду
  toggleAddingMode() {
    this.temp_team_name = '';
    this.add_team_mode = !this.add_team_mode
  }

  // Добавление команды
  x_createTeam(team_name) {
    if (!team_name) {
      console.log('Write some team name');
    }
    else {
      this._teamsService.x_createTeam(team_name)
        .subscribe(res => {
          // console.log(res.msg);
          if (res.success) {
            // На клиенте
            this.teams.push(res.data);
            this.temp_team_name = '';
            this.toggleAddingMode();
          }
        });
    }
  }

  // Нажатие на команде для отображения списка проектов
  // отправка id в dashboard - оттуда в project list
  sendIdToProjects(team_id) {
    this.TeamId.emit(team_id);
  }

  // На клиенте - удаляем из массива
  x_deleteTeamLocal(e) {
    let DB = this.teams;
    for (let i = 0; i < DB.length; i++) {
      if (DB[i].id == e) {
        this.teams.splice(i, 1);
      }
    }
  }

}
