import { inject, Injectable } from '@angular/core';
import { LocalStorageService } from '../../../shared/utils/local-storage.service';
import { Observable, of } from 'rxjs';
import { User } from '../interfaces/users.interface';
import { StorageKey } from '../../../shared/enums/storage-key.enum';
import { UsersApiService } from './users-api.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private readonly localStorageService = inject(LocalStorageService);
  private readonly usersApiService = inject(UsersApiService);

  getUsers(): Observable<User[]> {
    const usersFromStorage = this.localStorageService.get<User[]>(StorageKey.USERS);

    if (usersFromStorage?.length) {
      return of(usersFromStorage);
    }

    return this.usersApiService.getUsers();
  }
}
