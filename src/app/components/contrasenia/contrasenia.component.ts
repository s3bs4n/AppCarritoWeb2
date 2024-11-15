import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contrasenia',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contrasenia.component.html',
  styleUrl: './contrasenia.component.css'
})

export class ContraseniaComponent implements OnInit {

  irLogin(): void {
    this.router.navigate(['/login']);
  }

  recoverForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.recoverForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.recoverForm.valid) {
      const email = this.recoverForm.value.email;
      const password = this.authService.recoverPassword(email);
      if (password) {
        alert(`Tu contraseña es: ${password}`);
      } else {
        alert('El correo electrónico no está registrado');
      }
    }
  }
}
