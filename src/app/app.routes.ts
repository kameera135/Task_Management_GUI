import { Routes } from '@angular/router';
import { TaskBoardComponent } from './components/task-board/task-board.component';
import { LoginComponent } from './auth/login/login.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'dashboard', component: TaskBoardComponent },
  { path: 'login', component: LoginComponent}
];
