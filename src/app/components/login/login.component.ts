import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  error: string | null = null;

  irRegistro(): void {
    this.router.navigate(['/registro']);
  }

  irContrasenia(): void {
    this.router.navigate(['/contrasenia']);
  }

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      clave: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { correo, clave } = this.loginForm.value;

    if (this.authService.login(correo, clave)) {
      alert('Inicio de sesión exitoso');
      this.router.navigate(['/carrito']);
    } else {
      this.error = 'Correo o contraseña incorrectos';
    }
  }
}
