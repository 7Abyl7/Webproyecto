import { Component, OnInit } from '@angular/core';
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
export class CatalogoComponent implements OnInit {
  products: Product[] = [];

  constructor(private productsService: ProductsService, private carritoService: CarritoService) {}

  ngOnInit(): void {
    this.productsService.getaProductos().subscribe({
      next: (data) => {
        this.products = data;
        console.log('Productos recibidos: ', data);
      },
      error: (err) => {
        console.error('Error al obtener productos: ', err);
      }
    });
  }

  estaEnCarrito(id: number): boolean {
    return this.carritoService.estaEnCarrito(id);
  }

  modificarCarrito(producto: Product) { 
    if (this.carritoService.estaEnCarrito(producto.id)) {
      this.carritoService.quitar(producto.id);
    } 
    else {
      this.carritoService.agregar(producto);
    }
  }
}