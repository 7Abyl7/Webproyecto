import { Component, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-recuperar',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './recuperar.html',
  styleUrl: './recuperar.css'
})
export class RecuperarComponent {
  correo = '';
  cargando = false;
  error = '';

  constructor(private authService: AuthService, private cdr: ChangeDetectorRef, private router: Router, private userService: UserService) {}

  recuperarPassword(): void {
    this.error = '';
    if (!this.correo) {
      this.error = 'Rellena el campo';
      this.cdr.detectChanges();
      return;
    }
    this.cargando = true;
    this.authService.recuperarPassword({
      correo: this.correo
    }).subscribe({
      next: () => {
        this.cargando = false;
        this.authService.correo = this.correo
        this.router.navigate(['/restablecer']);
        this.cdr.detectChanges();
    },
    error: (err) => {
        this.error = err.error?.mensaje || 'Error al enviar correo';
        this.cargando = false;
        this.cdr.detectChanges();
    }
});   
  }
}