import { Component, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css'
})

export class RegisterComponent {
  nombre = '';
  correo = '';
  password = '';
  cargando = false;
  error = '';
  mensaje = '';

  constructor(private authService: AuthService, private router: Router, private cdr: ChangeDetectorRef) {}

  registrarse(): void {
    this.error = '';
    this.mensaje = '';
    if (!this.nombre || !this.correo || !this.password) {
      this.error = 'Todos los campos son obligatorios';
      this.cdr.detectChanges();
      return;
    }
    if (this.password.length < 8) {
        this.error ='La contraseña debe tener mínimo 8 caracteres';
        this.cdr.detectChanges();
        return;
    }
    this.cargando = true;
    this.authService.register({
      nombre: this.nombre,
      correo: this.correo,
      password: this.password
    }).subscribe({
      next: () => {
        this.cargando = false;
        this.mensaje = 'Usuario registrado correctamente';
        this.cdr.detectChanges();
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1500);
      },
      error: (err) => {
        this.cargando = false;
        this.error = err.error?.mensaje || 'Error al registrarse';
        this.cdr.detectChanges();
      }
    });
  }
}