import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { TodoCardComponent } from '../todo-card/todo-card.component';
import { NgFor } from '@angular/common';
import { Todo } from '../../interfaces/todos.interface';

@Component({
  selector: 'app-todos-list',
  standalone: true,
  imports: [TodoCardComponent, NgFor],
  templateUrl: './todos-list.component.html',
  styleUrl: './todos-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodosListComponent {
  @Input() todos: Todo[] = [];

  @Output() deleteTodo = new EventEmitter<number>();

  onDeleteTodo(todoId: number) {
    this.deleteTodo.emit(todoId);
  }
}
