import { Component, signal } from '@angular/core';
import { Product } from '../../../models/producto.model';
import { ProductCardComponent } from '../product-card/product-card';
import { CarritoComponent } from '../carrito/carrito';
import { CarritoService } from '../../../services/carrito.service';
import { ProductsService } from '../../../services/productos.service';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [ProductCardComponent, CarritoComponent],
  templateUrl: './catalogo.html',
  styleUrl: './catalogo.css',
})
export class CatalogoComponent {
  products = signal<Product[]>([]);

  constructor(private productsService: ProductsService, private carritoService: CarritoService) {
    this.productsService.getAll().subscribe({
      next: (data) => this.products.set(data),
      error: (err) => console.error('Error cargando XML:', err),
    });
  }

  agregar(producto: Product) {
    this.carritoService.agregar(producto);
  }
}
