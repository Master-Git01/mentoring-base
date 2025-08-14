import { Routes } from '@angular/router';
import { MainPath } from './core/enums/main-path.enum';

export const routes: Routes = [
  {
    path: MainPath.ROOT,
    loadComponent: () =>
      import('./main/components/materials-card/materials-card.component').then(
        (c) => c.MaterialsCardComponent,
      ),
  },
  {
    path: MainPath.USERS,
    loadComponent: () =>
      import('./users/components/users-card/users-card.component').then(
        (c) => c.UsersCardComponent,
      ),
  },
];
