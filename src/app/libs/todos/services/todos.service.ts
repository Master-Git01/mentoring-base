import { inject, Injectable } from '@angular/core';
import { LocalStorageService } from '../../../shared/utils/local-storage.service';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { Todo } from '../interfaces/todos.interface';
import { StorageKey } from '../../../shared/enums/storage-key.enum';
import { TodosApiService } from './todos-api.service';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  private readonly localStorageService = inject(LocalStorageService);
  private readonly todosApiService = inject(TodosApiService);

  private readonly todos$$ = new BehaviorSubject<Todo[]>([]);

  readonly todos$: Observable<Todo[]> = this.todos$$.asObservable();

  get todos(): Todo[] {
    return this.todos$$.getValue();
  }

  set todos(todos: Todo[]) {
    this.todos$$.next(todos);
    this.localStorageService.set(StorageKey.TODOS, todos);
  }

  initTodos(): Observable<Todo[]> {
    return this.getTodos().pipe(tap((todos: Todo[]) => (this.todos = todos)));
  }

  isExistingUserId(newTodo: Todo): boolean {
    return this.todos.some((todo) => todo.userId === newTodo.userId);
  }

  createTodo(newTodo: Todo): void {
    const newTodos = [...this.todos, newTodo];
    this.todos = newTodos;
  }

  editTodo(editedTodo: Todo): void {
    const updatedTodos = this.todos.map((todo: Todo) =>
      todo.id === editedTodo.id ? editedTodo : todo,
    );
    this.todos = updatedTodos;
  }

  deleteTodo(todoId: number): void {
    const remainingTodos = this.todos.filter((todo: Todo) => todo.id !== todoId);
    this.todos = remainingTodos;
  }

  private getTodos(): Observable<Todo[]> {
    const todosFromStorage = this.localStorageService.get<Todo[]>(StorageKey.TODOS);

    if (todosFromStorage?.length) {
      return of(todosFromStorage);
    }

    return this.todosApiService.getTodos();
  }
}
