import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '../interfaces/users.interface';
import { Observable } from 'rxjs';
import { MainPath } from '../../../core/enums/main-path.enum';

@Injectable({
  providedIn: 'root',
})
export class UsersApiService {
  private readonly http: HttpClient = inject(HttpClient);

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`/${MainPath.USERS}`);
  }
}
