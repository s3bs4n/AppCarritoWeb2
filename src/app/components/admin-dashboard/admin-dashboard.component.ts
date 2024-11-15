// admin-dashboard.component.ts

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

interface User {
  email: string;
  password: string;
}

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  users: User[] = [];

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.users = this.authService.getUsers();
  }

  eliminarUsuario(user: User): void {
    // Filtrar los usuarios para eliminar el usuario seleccionado
    this.users = this.users.filter(u => u.email !== user.email);
    
    // Actualizar el LocalStorage con la lista filtrada de usuarios
    localStorage.setItem('users', JSON.stringify(this.users));
  }

  logout(): void {
    this.router.navigate(['/admin-login']);
  }
}
