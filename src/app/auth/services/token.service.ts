import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

const CURRENT_TOKEN = 'CURRENT_TOKEN';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  isAuthentication: BehaviorSubject<boolean>;

  constructor() {
    this.isAuthentication = new BehaviorSubject<boolean>(this.isAuthenticated());
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token; // Convert to boolean; true if token is present, false if null or undefined
  }

  isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  updateToken(status: boolean) {
    this.isAuthentication.next(status);
  }

  setToken(token: string) {
    if (this.isBrowser()) {
      localStorage.setItem(CURRENT_TOKEN, token);
      this.updateToken(true);
    }
  }

  getToken(): string | null {
    if (this.isBrowser()) {
      return localStorage.getItem('token');
    }
    return null;
  }

  removeToken() {
    if (this.isBrowser()) {
      localStorage.removeItem(CURRENT_TOKEN);
      this.updateToken(false);
    }
  }
}
