import { Routes } from '@angular/router';
import { MainPath } from './core/enums/main-path.enum';

export const routes: Routes = [
  {
    path: MainPath.ROOT,
    loadComponent: () => import('./main/pages/main/main.component').then((c) => c.MainComponent),
  },
];
