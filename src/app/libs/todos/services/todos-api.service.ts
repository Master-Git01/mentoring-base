import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from '../interfaces/todos.interface';
import { MainPath } from '../../../core/enums/main-path.enum';

@Injectable({
  providedIn: 'root',
})
export class TodosApiService {
  private http: HttpClient = inject(HttpClient);

  getTodos(todosLimit = 20): Observable<Todo[]> {
    return this.http.get<Todo[]>(`/${MainPath.TODOS}?_limit=${todosLimit}`);
  }
}
