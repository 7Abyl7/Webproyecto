import { Component, computed } from '@angular/core';
import { Product } from '../../../models/producto.model';
import { CurrencyPipe } from '@angular/common';
import { CarritoService } from '../../../services/carrito.service';
import { Router, RouterOutlet, RouterLinkWithHref } from '@angular/router';
import { Signal } from '@angular/core';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CurrencyPipe, RouterOutlet, RouterLinkWithHref],
  templateUrl: './carrito.html',
  styleUrl: './carrito.css',
})
export class CarritoComponent {
  carrito: Signal<Product[]>;
  total = computed(() => this.carritoService.total());

<<<<<<< Updated upstream
  constructor(private carritoService: CarritoService) {
    this.carrito = this.carritoService.productos;
  }

=======
  constructor(private carritoService: CarritoService, private cdr: ChangeDetectorRef, private router: Router) {
    this.carrito = this.carritoService.productos;
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.cdr.detectChanges();
    }, 0);
  }

>>>>>>> Stashed changes
  quitar(id: number) {
    this.carritoService.quitar(id);
  }

  vaciar() {
    this.carritoService.vaciar();
  }

  exportarXML() {
    this.carritoService.exportarXML();
  }

  estaEnCarrito(id: number) {
    this.carritoService.estaEnCarrito(id);
  }

  modificarCarrito(producto: Product) {
    this.carritoService.modificarCarrito(producto);
  }

  checkout() {
    this.router.navigate(['checkout']);
  }
}
