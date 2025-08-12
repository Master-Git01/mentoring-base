import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from '../interfaces/todos.interface';

@Injectable({
  providedIn: 'root',
})
export class TodosApiService {
  constructor(private http: HttpClient) {}

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(
      'https://jsonplaceholder.typicode.com/todos?_limit=20'
    );
  }
}
