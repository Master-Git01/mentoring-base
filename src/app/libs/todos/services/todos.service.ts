import { inject, Injectable } from '@angular/core';
import { LocalStorageService } from '../../../shared/utils/local-storage.service';
import { Observable, of } from 'rxjs';
import { Todo } from '../interfaces/todos.interface';
import { StorageKey } from '../../../shared/enums/storage-key.enum';
import { TodosApiService } from './todos-api.service';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  private readonly localStorageService = inject(LocalStorageService);
  private readonly todosApiService = inject(TodosApiService);

  getTodos(): Observable<Todo[]> {
    const todosFromStorage = this.localStorageService.get<Todo[]>(StorageKey.TODOS);

    if (todosFromStorage?.length) {
      return of(todosFromStorage);
    }

    return this.todosApiService.getTodos();
  }
}
