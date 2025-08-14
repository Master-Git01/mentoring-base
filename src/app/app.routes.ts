import { Routes } from '@angular/router';
import { MainPath } from './core/enums/main-path.enum';

export const routes: Routes = [
  {
    path: MainPath.ROOT,
    loadChildren: () => import('./main/main.routes').then((m) => m.mainRoutes),
  },
  {
    path: MainPath.USERS,
    loadChildren: () =>
      import('./users/users.routes').then((m) => m.usersRoutes),
  },
  {
    path: MainPath.TODOS,
    loadChildren: () =>
      import('./todos/todos.routes').then((m) => m.todosRoutes),
  },
];
