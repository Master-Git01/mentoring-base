import { Routes } from '@angular/router';
import { MainPath } from './core/enums/main-path.enum';

export const routes: Routes = [
  {
    path: MainPath.ROOT,
    loadComponent: () =>
      import('./main/pages/main/main.component').then((c) => c.MainComponent),
  },
  {
    path: MainPath.USERS,
    loadComponent: () =>
      import('./users/pages/users/users.component').then(
        (c) => c.UsersComponent,
      ),
  },
  {
    path: MainPath.TODOS,
    loadComponent: () =>
      import('./todos/pages/todos/todos.component').then(
        (c) => c.TodosComponent,
      ),
  },
];
