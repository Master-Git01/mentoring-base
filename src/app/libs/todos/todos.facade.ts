import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Todo } from './interfaces/todos.interface';
import { TodosService } from './services/todos.service';
import { TodosState } from './state/todos.state';

@Injectable({ providedIn: 'root' })
export class TodosFacade {
  private readonly todosService: TodosService = inject(TodosService);
  private readonly todosState: TodosState = inject(TodosState);

  readonly todos$: Observable<Todo[]> = this.todosState.todos$;

  initTodos(): Observable<Todo[]> {
    return this.todosService
      .getTodos()
      .pipe(tap((todos: Todo[]) => (this.todosState.todos = todos)));
  }

  createTodo(newTodo: Todo): void {
    if (this.todosState.isExistingUserId(newTodo)) {
      alert('Такой userId уже существует!');
    } else {
      this.todosState.createTodo(newTodo);
      alert('Новая задача успешно создана!');
    }
  }

  editTodo(editedTodo: Todo): void {
    this.todosState.editTodo(editedTodo);
  }

  deleteTodo(todoId: number): void {
    this.todosState.deleteTodo(todoId);
  }
}
