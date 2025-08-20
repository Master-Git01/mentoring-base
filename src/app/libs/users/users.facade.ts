import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { User } from './interfaces/users.interface';
import { UsersService } from './services/users.service';
import { UsersState } from './state/users.state';

@Injectable({ providedIn: 'root' })
export class UsersFacade {
  private readonly usersService: UsersService = inject(UsersService);
  private readonly usersState: UsersState = inject(UsersState);

  readonly users$: Observable<User[]> = this.usersState.users$;

  initUsers(): Observable<User[]> {
    return this.usersService
      .getUsers()
      .pipe(tap((users: User[]) => (this.usersState.users = users)));
  }

  createUser(newUser: User): void {
    if (this.usersState.isExistingUserEmail(newUser)) {
      alert('Такой email уже существует!');
    } else {
      this.usersState.createUser(newUser);
      alert('Новый пользователь успешно создан!');
    }
  }

  editUser(editedUser: User): void {
    this.usersState.editUser(editedUser);
  }

  deleteUser(userId: number): void {
    this.usersState.deleteUser(userId);
  }
}
