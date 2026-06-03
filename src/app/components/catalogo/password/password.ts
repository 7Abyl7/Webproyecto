import { Component, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-password',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './password.html',
  styleUrl: './password.css'
})
export class PasswordComponent {
  passwordActual = '';
  passwordNuevo = '';
  cargando = false;
  error = '';

  constructor(private authService: AuthService, private cdr: ChangeDetectorRef, private router: Router, private userService: UserService) {}

  cambiarPassword(): void {
    this.error = '';
    if (!this.passwordActual || !this.passwordNuevo) {
      this.error = 'Todos los campos son obligatorios';
      this.cdr.detectChanges();
      return;
    }
    if (this.passwordNuevo.length < 8) {
        this.error ='La contraseña debe tener mínimo 8 caracteres';
        this.cdr.detectChanges();
        return;
    }
    this.cargando = true;
    this.authService.cambiarPassword({
      id: this.userService.getUser()?.id,
      passwordActual: this.passwordActual,
      passwordNuevo: this.passwordNuevo
    }).subscribe({
      next: () => {
        this.cdr.detectChanges();
        this.router.navigate(['/catalogo']);
      },
      error: (err) => {
        this.cargando = false;
        this.error = err.error?.mensaje || 'Error al cambiar la contraseña';
        this.cdr.detectChanges();
      }
    });
  }
}