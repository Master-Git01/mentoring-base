import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { User } from '../../interfaces/users.interface';
import { UsersListComponent } from '../../components/users-list/users-list.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { UserCreateFormComponent } from '../../forms/user-create-form/user-create-form.component';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [UsersListComponent, AsyncPipe, UserCreateFormComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersComponent {
  private readonly usersService: UsersService = inject(UsersService);

  readonly users$: Observable<User[]> = this.usersService.users$;

  constructor() {
    this.initUsers();
  }

  createUser(newUser: User): void {
    if (this.usersService.isExistingUserEmail(newUser)) {
      alert('Такой email уже существует!');
    } else {
      this.usersService.createUser(newUser);
      alert('Новый пользователь успешно создан!');
    }
  }

  editUser(editedUser: User): void {
    this.usersService.editUser(editedUser);
  }

  deleteUser(userId: number): void {
    this.usersService.deleteUser(userId);
  }

  private initUsers(): void {
    this.usersService.initUsers().pipe(takeUntilDestroyed()).subscribe();
  }
}
