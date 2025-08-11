import { Routes } from '@angular/router';
import { MainPath } from './core/enums/main-path.enum';

export const routes: Routes = [
  {
    path: MainPath.Root,
    loadChildren: () => import('./main/main.routes').then((m) => m.mainRoutes),
  },
  {
    path: MainPath.Users,
    loadChildren: () =>
      import('./users/users.routes').then((m) => m.usersRoutes),
  },
];
