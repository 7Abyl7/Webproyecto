import { Component, signal, ChangeDetectorRef } from '@angular/core';
import { Router, RouterOutlet, RouterLinkWithHref, NavigationEnd } from '@angular/router';
import { CarritoService } from './services/carrito.service';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App {
  protected readonly title = signal('Webproyecto');
  mostrarModal = signal<'terminos' | 'aviso' | null>(null);
  mostrarPerfil = false;

  constructor(private router: Router, public carritoService: CarritoService, private authService: AuthService, private userService: UserService, private cdr: ChangeDetectorRef) {
    this.router.events
    .pipe(
      filter(event => event instanceof NavigationEnd)
    )
    .subscribe(() => {
      this.mostrarPerfil = false;
      this.cdr.detectChanges();
    });
  }

  regresar() {
    window.scrollTo({ top: 0, behavior: 'smooth'})
  }

  navegar() {
    this.router.navigate([this.router.url === '/catalogo' ? 'carrito' : '/catalogo']);
  }

  get icono() {
    return this.router.url === '/catalogo' ? '/carrito.png' : '/galeria.png';
  }

  get mostrarNavbar(): boolean {
    return !['/login','/registro', '/password'].includes(this.router.url);
  }

  get usuario() {
    return this.userService.getUser();
  }

  esAdmin(): boolean {
    return this.usuario?.id === 1;
  }

  togglePerfil() {
    this.mostrarPerfil = !this.mostrarPerfil;
  }

  historial() {
    this.router.navigate(['/historial']);
  }

  inventario() {
    this.router.navigate(['/inventario']);
  }

  cambiarPassword() {
    this.router.navigate(['/password']);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  abrirModal(tipo: 'terminos' | 'aviso') {
    this.mostrarModal.set(tipo);
  }

  cerrarModal() {
    this.mostrarModal.set(null);
  }

}
