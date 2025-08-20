import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { User } from '../../interfaces/users.interface';
import { UsersListComponent } from '../../components/users-list/users-list.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UsersFacade } from '../../users.facade';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { UserCreateFormComponent } from '../../forms/user-create-form/user-create-form.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [UsersListComponent, AsyncPipe, UserCreateFormComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersComponent {
  private readonly usersFacade: UsersFacade = inject(UsersFacade);

  readonly users$: Observable<User[]> = this.usersFacade.users$;

  constructor() {
    this.initUsers();
  }

  createUser(newUser: User): void {
    this.usersFacade.createUser(newUser);
  }

  editUser(editedUser: User): void {
    this.usersFacade.editUser(editedUser);
  }

  deleteUser(userId: number): void {
    this.usersFacade.deleteUser(userId);
  }

  private initUsers(): void {
    this.usersFacade.initUsers().pipe(takeUntilDestroyed()).subscribe();
  }
}
