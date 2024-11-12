import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Auth } from 'src/app/models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  apiUrl = "http://localhost:4000";

  login(model: Auth): Observable<any>{
    let queryParams = new HttpParams();

    return this.http.post<any>(this.apiUrl+`/user/login`,model,{
      params:queryParams
    });
  }
}
