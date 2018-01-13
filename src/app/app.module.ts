import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { routing } from './app.routes';

import { AuthService } from './-services/auth.service';
import { UsersService } from './-services/users.service';
import { TeamsService } from './-services/teams.service';
import { ProjectsService } from './-services/projects.service';
import { SectionsService } from './-services/sections.service';
import { DesksService } from './-services/desks.service';
import { TasksService } from './-services/tasks.service';
import { CommentsService } from './-services/comments.service';
import { SharedService } from './-services/shared.service';

import { AuthGuard } from './guards/authguard.guard';

import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

import { AuthComponent } from './components/auth/auth.component';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { E404 } from './components/e404/e404.component';

import { TeamListComponent } from './components/teams/team-list/team-list.component';
import { TeamComponent } from './components/teams/team/team.component';
import { UserComponent } from './components/users/user/user.component';
import { ProjectListComponent } from './components/projects/project-list/project-list.component';
import { ProjectListItemComponent } from './components/projects/project-list-item/project-list-item.component';
import { ProjectComponent } from './components/projects/project/project.component';
import { DeskComponent } from './components/desks/desk/desk.component';
import { ColorComponent } from './components/color/color/color.component';
import { SectionListComponent } from './components/sections/section-list/section-list.component';
import { SectionItemComponent } from './components/sections/section-item/section-item.component';
import { SectionOneComponent } from './components/sections/section-one/section-one.component';
import { TaskComponent } from './components/tasks/task/task.component';
import { CommentComponent } from './components/comments/comment/comment.component';

import { FavComponent } from './components/fav/fav.component';

import { LoadingComponent } from './components/loading/loading.component';


@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    DashboardComponent,
    LoginComponent,
    SignupComponent,
    E404,
    TeamListComponent,
    TeamComponent,
    UserComponent,
    ProjectListComponent,
    ProjectListItemComponent,
    ProjectComponent,
    DeskComponent,
    ColorComponent,
    SectionListComponent,
    SectionItemComponent,
    SectionOneComponent,
    TaskComponent,
    CommentComponent,
    FavComponent,
    LoadingComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    routing,
    HttpModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    UsersService,
    TeamsService,
    ProjectsService,
    SectionsService,
    DesksService,
    TasksService,
    CommentsService,
    SharedService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
