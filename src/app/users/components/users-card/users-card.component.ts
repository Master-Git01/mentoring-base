import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { User } from '../../interfaces/users.interface';

@Component({
  selector: 'app-users-card',
  standalone: true,
  imports: [],
  templateUrl: './users-card.component.html',
  styleUrl: './users-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersCardComponent {
  @Input({ required: true }) user!: User;

  @Output() deleteUser = new EventEmitter<number>();

  onDelete(userId: number): void {
    this.deleteUser.emit(userId);
  }
}
