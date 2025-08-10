import { Routes } from '@angular/router';

export const mainRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/main/main.component').then((c) => c.MainComponent),
  },
];
