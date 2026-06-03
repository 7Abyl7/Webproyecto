import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Product } from '../../../models/producto.model';
import { ProductsService } from '../../../services/productos.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-inventario',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './inventario.html',
  styleUrl: './inventario.css'
})
export class InventarioComponent implements OnInit {
  productos: Product[] = [];
  filtro = '';

  constructor(private productsService: ProductsService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos(): void {
    this.productsService.getaProductos().subscribe({
      next: (data) => {
        this.productos = data;
        setTimeout(() => {
          this.cdr.detectChanges();
        });
      },
      error: (err) => {
        console.error(err);
        setTimeout(() => {
          this.cdr.detectChanges();
        });
      }
    });
  }

  editar(producto: Product): void {
    console.log('Editar', producto);
  }

  eliminar(producto: Product): void {
    console.log('Eliminar', producto);
  }

  agregarProducto(): void {
    console.log('Agregar producto');
  }
}