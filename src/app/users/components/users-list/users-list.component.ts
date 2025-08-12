import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { UserCardComponent } from '../user-card/user-card.component';
import { NgFor } from '@angular/common';
import { User } from '../../interfaces/users.interface';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [UserCardComponent, NgFor],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersListComponent {
  @Input() users: User[] = [];

  @Output() deleteUser = new EventEmitter<number>();

  onDeleteUser(userId: number) {
    this.deleteUser.emit(userId);
  }
}
