import { RouterModule } from '@angular/router';

import { AuthComponent } from './components/auth/auth.component';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';

import { DashboardComponent } from './components/dashboard/dashboard.component';

import { ProjectComponent } from './components/projects/project/project.component';

import { SectionOneComponent } from './components/sections/section-one/section-one.component';

import { DeskComponent } from './components/desks/desk/desk.component';

import { TaskComponent } from './components/tasks/task/task.component';

import { ErrorComponent } from './components/error/error.component';

import { AuthGuard } from './guards/authguard.guard';



const APP_ROUTES = [
	{
		path: '',
		redirectTo: '/login',
		pathMatch: 'full'
	},
	{
		path: '',
		component: AuthComponent,
		children: [
			{
				path: 'login',
				component: LoginComponent
			},
			{
				path: 'signup',
				component: SignupComponent
			}
		]
	},
	{
		path: 'dash',
		component: DashboardComponent,
		canActivate: [AuthGuard],
		children: [
			{
				path: 'project/:id',
				component: ProjectComponent
			},
			{
				path: 'project/:id/section/:id',
				component: SectionOneComponent
			},
			{
				path: 'project/:id/section/:id/desk/:id',
				component: DeskComponent,
				children: [
					{
						path: 'task/:id',
						component: TaskComponent
					}
				]
			}
		]
	},
	{
		path: 'error',
		component: ErrorComponent
	},
	{
		path: '**',
		redirectTo: 'error',
		pathMatch: 'full'
	}
];

export const routing = RouterModule.forRoot(APP_ROUTES);

