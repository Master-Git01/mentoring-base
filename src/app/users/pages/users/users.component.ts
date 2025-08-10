import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
} from '@angular/core';
import { UsersCardComponent } from '../../components/users-card/users-card.component';
import { UsersApiService } from '../../services/users-api.service';
import { User } from '../../interfaces/users.interface';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [UsersCardComponent, NgFor],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersComponent {
  private readonly usersApiService: UsersApiService = inject(UsersApiService);
  private readonly cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
  public users: User[] = [];

  ngOnInit(): void {
    this.usersApiService.getUsers().subscribe((users: User[]) => {
      this.users = users;
      this.cdr.markForCheck();
    });
  }

  deleteUser(userId: number) {
    this.users = this.users.filter((user: User) => user.id !== userId);
  }
}
