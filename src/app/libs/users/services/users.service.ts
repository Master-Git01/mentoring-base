import { inject, Injectable } from '@angular/core';
import { LocalStorageService } from '../../../shared/utils/local-storage.service';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { User } from '../interfaces/users.interface';
import { StorageKey } from '../../../shared/enums/storage-key.enum';
import { UsersApiService } from './users-api.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private readonly localStorageService = inject(LocalStorageService);
  private readonly usersApiService = inject(UsersApiService);

  private readonly users$$ = new BehaviorSubject<User[]>([]);

  readonly users$: Observable<User[]> = this.users$$.asObservable();

  get users(): User[] {
    return this.users$$.getValue();
  }

  set users(users: User[]) {
    this.users$$.next(users);
    this.localStorageService.set(StorageKey.USERS, users);
  }

  initUsers(): Observable<User[]> {
    return this.getUsers().pipe(tap((users: User[]) => (this.users = users)));
  }

  isExistingUserEmail(newUser: User): boolean {
    return this.users.some((user) => user.email === newUser.email);
  }

  createUser(newUser: User): void {
    const newUsers = [...this.users, newUser];
    this.users = newUsers;
  }

  editUser(editedUser: User): void {
    const updatedUsers = this.users.map((user: User) =>
      user.id === editedUser.id ? editedUser : user,
    );
    this.users = updatedUsers;
  }

  deleteUser(userId: number): void {
    const remainingUsers = this.users.filter((user: User) => user.id !== userId);
    this.users = remainingUsers;
  }

  private getUsers(): Observable<User[]> {
    const usersFromStorage = this.localStorageService.get<User[]>(StorageKey.USERS);

    if (usersFromStorage?.length) {
      return of(usersFromStorage);
    }

    return this.usersApiService.getUsers();
  }
}
