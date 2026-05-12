import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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

  constructor(private productsService: ProductsService, private carritoService: CarritoService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos(categoria: string = ''): void {
    this.productsService.getaProductos(categoria).subscribe({
      next: (data) => {
        this.products = data;
        console.log('Productos recibidos: ', data);
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al obtener productos: ', err);
      }
    });
    this.cdr.detectChanges();
  }

  cambiarCategoria(event: any) {
    this.cargarProductos(event.target.value);
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