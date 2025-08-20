import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, inject, Output } from '@angular/core';
import { Todo } from '../../interfaces/todos.interface';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-todo-create-form',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule],
  templateUrl: './todo-create-form.component.html',
  styleUrl: './todo-create-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoCreateFormComponent {
  @Output() createTodo = new EventEmitter<Todo>();

  private readonly fb: FormBuilder = inject(FormBuilder);

  readonly form: FormGroup = this.fb.group({
    title: ['', Validators.required],
    completed: [false, Validators.required],
    userId: ['', Validators.required],
  });

  onSubmit(): void {
    this.createTodo.emit({ ...this.form.value, id: new Date().getTime() });
    this.form.reset({
      completed: false,
    });
  }
}
