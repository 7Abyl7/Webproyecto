import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Product } from '../../../models/producto.model';
import { ProductsService } from '../../../services/productos.service';
import { CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-inventario',
  standalone: true,
  imports: [CurrencyPipe, FormsModule],
  templateUrl: './inventario.html',
  styleUrl: './inventario.css'
})
export class InventarioComponent implements OnInit {
  productos: Product[] = [];
  filtro = '';
  mostrarEditar = false;
  mostrarAgregar = false; 
  nuevoProducto: Product = {
    id: 0,
    nombre: '',
    precio: 0,
    resolucion: '',
    autor: '',
    URLImg: '',
    categoria: ''
  };
  productoEditar: Product = {
    id: 0,
    nombre: '',
    precio: 0,
    resolucion: '',
    autor: '',
    URLImg: '',
    categoria: ''
  };

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
    this.productoEditar = {...producto};
    this.mostrarEditar = true;
  }

  guardarCambios(): void {
    this.productsService
      .editarProducto(
          this.productoEditar.id,
          this.productoEditar
      )
      .subscribe({
          next: () => {
              const index = this.productos.findIndex(
                  p => p.id === this.productoEditar.id
              );
              if (index !== -1) {
                  this.productos[index] = {...this.productoEditar};
              }
              this.cerrarModal();
              this.cdr.detectChanges();
          },
          error: (err) => {
              console.error(err);
              this.cerrarModal();
              this.cdr.detectChanges();
          }
      });
  }

  borrar(producto: Product): void {
    const confirmar = confirm(`¿Eliminar "${producto.nombre}"?`);
    if (!confirmar) {
        return;
    }
    this.productsService
        .eliminarProducto(producto.id)
        .subscribe({
            next: () => {
              this.cargarProductos();
              this.productos = this.productos.filter(p => p.id !== producto.id);
              this.cdr.detectChanges();
            },
            error: (err) => {
                console.error(err);
                alert('Error al eliminar producto');
                this.cdr.detectChanges();
            }
        });
  }

  agregarObra(): void {
    this.nuevoProducto = {
      id: 0,
      nombre: '',
      precio: 0,
      resolucion: '',
      autor: '',
      URLImg: '',
      categoria: ''
    };
    this.mostrarAgregar = true;
  }

  guardarNuevoProducto(): void {
    this.productsService
      .agregarProducto(this.nuevoProducto)
      .subscribe({
          next: () => {
              this.cargarProductos();
              this.mostrarAgregar = false;
              this.cdr.detectChanges();
          },
          error: (err) => {
              console.error(err);
              this.cdr.detectChanges();
          }
      });
}

  cerrarModal(): void {
    this.mostrarEditar = false;
  }
}