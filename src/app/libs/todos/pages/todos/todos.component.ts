import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Todo } from '../../interfaces/todos.interface';
import { TodosListComponent } from '../../components/todos-list/todos-list.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { TodoCreateFormComponent } from '../../forms/todo-create-form/todo-create-form.component';
import { TodosService } from '../../services/todos.service';

@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [TodosListComponent, AsyncPipe, TodoCreateFormComponent],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodosComponent {
  private readonly todosService: TodosService = inject(TodosService);

  readonly todos$: Observable<Todo[]> = this.todosService.todos$;

  constructor() {
    this.initTodos();
  }

  createTodo(newTodo: Todo): void {
    if (this.todosService.isExistingUserId(newTodo)) {
      alert('Такой email уже существует!');
    } else {
      this.todosService.createTodo(newTodo);
      alert('Новый пользователь успешно создан!');
    }
  }

  editTodo(editedTodo: Todo): void {
    this.todosService.editTodo(editedTodo);
  }

  deleteTodo(todoId: number): void {
    this.todosService.deleteTodo(todoId);
  }

  private initTodos(): void {
    this.todosService.initTodos().pipe(takeUntilDestroyed()).subscribe();
  }
}
