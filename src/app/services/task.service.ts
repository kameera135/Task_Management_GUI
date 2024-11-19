import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private httpClient: HttpClient) { }

  apiUrl = 'http://127.0.0.1:4000/task';

  //get all tasks
  getTasks(){
    const url = `${this.apiUrl}/tasks`;

    return this.httpClient.get(url);
  }

}
