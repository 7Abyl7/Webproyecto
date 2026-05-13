import { Component, signal } from '@angular/core';
import { Router, RouterOutlet, RouterLinkWithHref } from '@angular/router';
import { CarritoService } from './services/carrito.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLinkWithHref],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App {
  protected readonly title = signal('Webproyecto');
  mostrarModal = signal<'terminos' | 'aviso' | null>(null);

  constructor(private router: Router, public carritoService: CarritoService) {}

  regresar() {
    window.scrollTo({ top: 0, behavior: 'smooth'})
  }

  navegar() {
    this.router.navigate([this.router.url === '/' ? 'carrito' : '/']);
  }

  get icono() {
    return this.router.url === '/' ? '/carrito.png' : '/galeria.png';
  }

  abrirModal(tipo: 'terminos' | 'aviso') {
    this.mostrarModal.set(tipo);
  }

  cerrarModal() {
    this.mostrarModal.set(null);
  }
}
