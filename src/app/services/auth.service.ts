import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private registerUrl = 'https://localhost:7295/api/Auth/register';
  private loginUrl = 'https://localhost:7295/api/Auth/login';

  constructor(private http: HttpClient) {}

  register(data: { username: string; password: string; email: string; roleId: number }): Observable<any> {
    return this.http.post<any>(this.registerUrl, data);
  }

  login(data: { username: string; password: string }): Observable<any> {
    return this.http.post<any>(this.loginUrl, data);
  }
}
