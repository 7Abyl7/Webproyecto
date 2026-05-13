import { Component, signal } from '@angular/core';
import { Router, RouterOutlet, RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLinkWithHref],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App {
  protected readonly title = signal('Webproyecto');
  constructor(private router: Router) {}

  regresar() {
    window.scrollTo({ top: 0, behavior: 'smooth'})
  }

  navegar() {
    this.router.navigate([this.router.url === '/' ? 'carrito' : '/']);
  }

  get icono() {
    return this.router.url === '/' ? '/carrito.png' : '/galeria.png';
  }
}
