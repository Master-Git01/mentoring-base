import { Routes } from '@angular/router';

export const usersRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/users/users.component').then((c) => c.UsersComponent),
  },
];
