import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LocalStorageService } from '../../../shared/utils/local-storage.service';
import { Todo } from '../interfaces/todos.interface';
import { StorageKey } from '../../../shared/enums/storage-key.enum';

@Injectable({ providedIn: 'root' })
export class TodosState {
  private readonly localStorageService = inject(LocalStorageService);

  private readonly todos$$ = new BehaviorSubject<Todo[]>([]);

  readonly todos$: Observable<Todo[]> = this.todos$$.asObservable();

  get todos(): Todo[] {
    return this.todos$$.getValue();
  }

  set todos(todos: Todo[]) {
    this.todos$$.next(todos);
    this.localStorageService.set(StorageKey.TODOS, todos);
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
}
