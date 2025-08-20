import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '../../interfaces/todos.interface';

@Component({
  selector: 'app-todo-card',
  standalone: true,
  imports: [],
  templateUrl: './todo-card.component.html',
  styleUrl: './todo-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoCardComponent {
  @Input({ required: true }) todo!: Todo;

  @Output() deleteTodo = new EventEmitter<number>();

  onDeleteTodo(todoId: number): void {
    this.deleteTodo.emit(todoId);
  }
}
