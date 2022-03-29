import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  public isAuthenticated(): boolean {
    const user = localStorage.getItem('User');
    var use1=JSON.stringify(user);
    return true;
  }
}
