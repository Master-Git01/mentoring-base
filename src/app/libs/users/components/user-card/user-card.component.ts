import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../interfaces/users.interface';
import { MatTooltipModule } from '@angular/material/tooltip';
import { USER_TOOLTIPS } from '../../enums/constants.enum';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [MatTooltipModule, MatButtonModule, MatCardModule, MatIcon],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserCardComponent {
  @Input({ required: true }) user!: User;

  @Output() deleteUser = new EventEmitter<number>();
  @Output() editUser = new EventEmitter<User>();

  get messageTooltip(): string {
    return USER_TOOLTIPS.DELETE;
  }

  onUserDelete(userId: number): void {
    this.deleteUser.emit(userId);
  }

  onUserEdit(): void {
    this.editUser.emit(this.user);
  }
}
