import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Product } from '../../../models/producto.model';
import { ProductCardComponent } from '../product-card/product-card';
import { CarritoService } from '../../../services/carrito.service';
import { ProductsService } from '../../../services/productos.service';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [ProductCardComponent, FormsModule],
  templateUrl: './catalogo.html',
  styleUrl: './catalogo.css',
})

export class CatalogoComponent implements OnInit {
  products: Product[] = [];
  productosOriginales: Product[] = []
  busqueda: string = '';
  categoriasSeleccionadas: string[] = [];
  renderKey = 0;
  cargando = false;

  constructor(private productsService: ProductsService, private carritoService: CarritoService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos(): void {
    this.cargando = true;
    this.productsService.getaProductos(this.categoriasSeleccionadas).subscribe({
      next: (data) => {
        this.cargando = false;
        this.productosOriginales = [...data];
        this.products = [...data];
        console.log("Productos recibidos:", data);
        this.renderKey++;
        setTimeout(() => {
          this.cdr.detectChanges();
        });
      },
      error: (err) => {
        this.cargando = false;
        console.error("Error al obtener productos:", err);
      }
    });
  }

  buscarProducto(): void {
    const texto = this.busqueda.toLowerCase().trim();
    if (texto === '') {
      this.products = [...this.productosOriginales];
      return;
    }
    this.products = this.productosOriginales.filter(p => p.nombre.toLowerCase().includes(texto));
    this.renderKey++;
    this.cdr.detectChanges() 
  }

  toggleCategoria(categoria: string, event: any): void {
    if (event.target.checked) {
      this.categoriasSeleccionadas.push(categoria);
    } else {
      this.categoriasSeleccionadas = this.categoriasSeleccionadas.filter(c => c !== categoria);
    }
    this.busqueda = '';
    this.cargarProductos();
  }

  estaEnCarrito(id: number): boolean {
    return this.carritoService.estaEnCarrito(id);
  }

  modificarCarrito(producto: Product): void {
    if (this.carritoService.estaEnCarrito(producto.id)) {
      this.carritoService.quitar(producto.id);
    } else {
      this.carritoService.agregar(producto);
    }
  }
}