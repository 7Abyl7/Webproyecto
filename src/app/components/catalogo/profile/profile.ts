import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})

export class ProfileComponent {
  constructor(private authService: AuthService,private router: Router) {}

  cerrarSesion(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}