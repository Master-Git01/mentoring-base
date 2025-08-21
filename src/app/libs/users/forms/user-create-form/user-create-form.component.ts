import { ChangeDetectionStrategy, Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { User } from '../../interfaces/users.interface';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-user-create-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatButtonModule, MatInputModule, MatFormFieldModule],
  templateUrl: './user-create-form.component.html',
  styleUrl: './user-create-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserCreateFormComponent {
  @Output() createUser = new EventEmitter<User>();

  private readonly fb: FormBuilder = inject(FormBuilder);

  readonly form: FormGroup = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    website: ['', Validators.required],
    company: this.fb.group({
      name: ['', Validators.required],
    }),
  });

  onSubmit(): void {
    this.createUser.emit(this.form.value);
    this.form.reset();
  }
}
