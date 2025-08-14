import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from '../interfaces/todos.interface';

@Injectable({
  providedIn: 'root',
})
export class TodosApiService {
  private http: HttpClient = inject(HttpClient);

  getTodos(todosLimit: number = 20): Observable<Todo[]> {
    return this.http.get<Todo[]>(
      `https://jsonplaceholder.typicode.com/todos?_limit=${todosLimit}`,
    );
  }
}
