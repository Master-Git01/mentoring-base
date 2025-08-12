import { Routes } from '@angular/router';

export const todosRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/todos/todos.component').then((c) => c.TodosComponent),
  },
];
