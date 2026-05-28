import { Component, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})

export class LoginComponent {
  correo = '';
  password = '';
  cargando = false;
  error = '';

  constructor(private authService: AuthService, private userService: UserService, private router: Router, private cdr: ChangeDetectorRef) {}

  iniciarSesion(): void {
    this.error = '';
    if (!this.correo || !this.password) {
      this.error = 'Todos los campos son obligatorios';
      this.cdr.detectChanges();
      return;
    }
    this.cargando = true;
    this.authService.login({
      correo: this.correo,
      password: this.password
    })
    .subscribe({
      next: (response) => {
        console.log('LOGIN RESPONSE:', response);
        this.authService.saveToken(response.token);
        this.userService.saveUser(response.usuario);
        this.cargando = false;
        this.router.navigate(['/catalogo']);
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.cargando = false;
        this.error = err.error?.mensaje || 'Error al iniciar sesión';
        this.cdr.detectChanges();
      }
    });
  }
}