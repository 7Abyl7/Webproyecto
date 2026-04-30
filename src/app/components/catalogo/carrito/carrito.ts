import { Component, computed } from '@angular/core';
import { Product } from '../../../models/producto.model';
import { CurrencyPipe } from '@angular/common';
import { CarritoService } from '../../../services/carrito.service';
import { Signal } from '@angular/core';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './carrito.html',
  styleUrl: './carrito.css',
})
export class CarritoComponent {
  carrito: Signal<Product[]>;
  total = computed(() => this.carritoService.total());

  constructor(private carritoService: CarritoService) {
    this.carrito = this.carritoService.productos;
  }

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
}
