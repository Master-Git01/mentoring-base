import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Todo } from '../../interfaces/todos.interface';
import { TodosListComponent } from '../../components/todos-list/todos-list.component';
import { TodosFacade } from '../../todos.facade';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { TodoCreateFormComponent } from '../../forms/todo-create-form/todo-create-form.component';

@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [TodosListComponent, AsyncPipe, TodoCreateFormComponent],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodosComponent {
  private readonly todosFacade: TodosFacade = inject(TodosFacade);

  readonly todos$: Observable<Todo[]> = this.todosFacade.todos$;

  constructor() {
    this.initTodos();
  }

  createTodo(newTodo: Todo): void {
    this.todosFacade.createTodo(newTodo);
  }

  editTodo(editedTodo: Todo): void {
    this.todosFacade.editTodo(editedTodo);
  }

  deleteTodo(todoId: number): void {
    this.todosFacade.deleteTodo(todoId);
  }

  private initTodos(): void {
    this.todosFacade.initTodos().pipe(takeUntilDestroyed()).subscribe();
  }
}
