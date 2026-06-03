import { Component, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-restablecer',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './restablecer.html',
  styleUrl: './restablecer.css'
})
export class RestablecerComponent {
  codigo = '';
  password = '';
  cargando = false;
  error = '';

  constructor(private authService: AuthService, private cdr: ChangeDetectorRef, private router: Router, private userService: UserService) {}

  restablecerPassword(): void {
    this.error = '';
    if (!this.codigo || !this.password) {
      this.error = 'Rellena los campos';
      this.cdr.detectChanges();
      return;
    }
    this.cargando = true;
    this.authService
    .restablecerPassword({
        correo: this.authService.getCorreo(),
        codigo: this.codigo,
        password: this.password
    })
    .subscribe({
        next: () => {
            this.router.navigate(['/login']);
            this.cdr.detectChanges();
        },
        error: (err) => {
            console.error(err);
        }
    }); 
  }
}