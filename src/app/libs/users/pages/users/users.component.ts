import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { User } from '../../interfaces/users.interface';
import { UsersListComponent } from '../../components/users-list/users-list.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter, Observable, tap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { UsersService } from '../../services/users.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { EditUser } from '../../interfaces/edit-user.interface';
import { UserFormDialogComponent } from '../../dialogs/user-form-dialog/user-form-dialog.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { USER_TOOLTIPS } from '../../enums/constants.enum';
import { UserDeleteConfirmDialogComponent } from '../../dialogs/user-delete-confirm-dialog/user-delete-confirm-dialog.component';
import { UserDeleteConfirmDialogData } from '../../dialogs/interfaces/user-delete-confirm-dialog-data.interface';
import { DestroyRef } from '@angular/core';
import { NotificationService } from '../../../../shared/services/snackbar.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [UsersListComponent, AsyncPipe, MatButtonModule, MatIconModule, MatTooltipModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersComponent implements OnInit {
  private readonly usersService: UsersService = inject(UsersService);
  private readonly dialog: MatDialog = inject(MatDialog);
  private readonly destroyRef = inject(DestroyRef);
  private readonly notificationService: NotificationService = inject(NotificationService);

  readonly users$: Observable<User[]> = this.usersService.users$;

  get messageTooltip(): string {
    return USER_TOOLTIPS.ADD;
  }

  ngOnInit(): void {
    this.usersService
      .initUsers()
      .pipe(tap((users: User[]) => (this.usersService.users = users)))
      .subscribe();
  }

  openCreateUserDialog(): void {
    this.dialog
      .open<UserFormDialogComponent, User>(UserFormDialogComponent)
      .afterClosed()
      .pipe(
        filter(Boolean),
        tap((newUser: User) => this.createUser(newUser)),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();
  }

  openEditUserDialog(user: User): void {
    this.dialog
      .open<UserFormDialogComponent, EditUser, User>(UserFormDialogComponent, { data: { user } })
      .afterClosed()
      .pipe(
        filter(Boolean),
        tap((editedUser: User) => {
          this.usersService.editUser(editedUser);
          this.notificationService.showSuccess('Пользователь успешно изменен');
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();
  }

  openDeleteUserDialog(userId: number): void {
    this.dialog
      .open<UserDeleteConfirmDialogComponent, UserDeleteConfirmDialogData, boolean>(
        UserDeleteConfirmDialogComponent,
        {
          data: {
            title: 'Удаление пользователя',
            content: `<h3 style="font-weight: 500;font-size: 24px">Удалить пользователя с ID: (${userId})?</h3>`,
            submitButtonText: 'Удалить',
          },
        },
      )
      .afterClosed()
      .pipe(
        filter(Boolean),
        tap(() => {
          this.usersService.deleteUser(userId);
          this.notificationService.showSuccess('Пользователь успешно удален');
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();
  }

  private createUser(newUser: User): void {
    if (this.usersService.isExistingUserEmail(newUser)) {
      this.notificationService.showMessage('Такой email уже существует!');
    } else {
      this.usersService.createUser(newUser);
      this.notificationService.showSuccess('Новый пользователь успешно создан!');
    }
  }
}
