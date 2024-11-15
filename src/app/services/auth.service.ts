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
  private adminUser: User = {
    nombre: 'Admin',
    email: 'seba@seba.com',
    password: '12345qwert'
  };

  // constructor() {
  //   const storedUsers = localStorage.getItem('users');
  //   if (storedUsers) {
  //     this.users = JSON.parse(storedUsers);
  //   }
  // }
  private isLocalStorageAvailable(): boolean {
    try {
      const test = 'test';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  }
  constructor() {
    if (this.isLocalStorageAvailable()) {

      const storedUsers = localStorage.getItem('users');
      if (storedUsers) {
        this.users = JSON.parse(storedUsers);
      }
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
    if (user) {
      localStorage.setItem('loggedInUser', email);
      return true;
    } else if (email === this.adminUser.email && password === this.adminUser.password) {
      localStorage.setItem('loggedInAdmin', email);
      return true;
    }
    return false;
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('loggedInUser') || !!localStorage.getItem('loggedInAdmin');
  }

  isAdminLoggedIn(): boolean {
    return !!localStorage.getItem('loggedInAdmin');
  }

  logout(): void {
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('loggedInAdmin');
  }

  getLoggedInUser(): string | null {
    return localStorage.getItem('loggedInUser');
  }

  getLoggedInAdmin(): string | null {
    return localStorage.getItem('loggedInAdmin');
  }

  recoverPassword(email: string): string | null {
    const user = this.users.find(user => user.email === email);
    return user ? user.password : null;
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////// USUARIO ADMIN /////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  getUsers(): User[] {
    return this.users;
  }


}
