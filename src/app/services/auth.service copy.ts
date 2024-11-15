import { Injectable } from '@angular/core';

interface User {
  nombre: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private users: User[] = [];

  constructor() {
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      this.users = JSON.parse(storedUsers);
    }
  }

  register(nombre: string, email: string, password: string): boolean {
    if (this.users.find(user => user.email === email)) {
      return false; // Usuario ya registrado
    }

    const newUser: User = { nombre, email, password };
    this.users.push(newUser);
    localStorage.setItem('users', JSON.stringify(this.users));
    return true;
  }

  login(email: string, password: string): boolean {
    const user = this.users.find(user => user.email === email && user.password === password);
    return !!user;
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('loggedInUser');
  }

  logout(): void {
    localStorage.removeItem('loggedInUser');
  }

  setLoggedInUser(email: string): void {
    localStorage.setItem('loggedInUser', email);
  }

  getLoggedInUser(): string | null {
    return localStorage.getItem('loggedInUser');
  }
}
