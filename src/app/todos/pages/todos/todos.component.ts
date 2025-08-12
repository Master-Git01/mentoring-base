import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
} from '@angular/core';
import { TodosApiService } from '../../services/todos-api.service';
import { Todo } from '../../interfaces/todos.interface';
import { TodosListComponent } from '../../components/todos-list/todos-list.component';

@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [TodosListComponent],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodosComponent {
  private readonly todosApiService: TodosApiService = inject(TodosApiService);
  private readonly cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
  public todos: Todo[] = [];

  ngOnInit(): void {
    this.todosApiService.getTodos().subscribe((todos: Todo[]) => {
      this.todos = todos;
      this.cdr.markForCheck();
    });
  }

  deleteTodo(todoId: number) {
    this.todos = this.todos.filter((todo: Todo) => todo.id !== todoId);
  }
}
