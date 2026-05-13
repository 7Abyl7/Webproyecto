import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Product } from '../../../models/producto.model';
import { ProductCardComponent } from '../product-card/product-card';
import { CarritoComponent } from '../carrito/carrito';
import { CarritoService } from '../../../services/carrito.service';
import { ProductsService } from '../../../services/productos.service';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [ProductCardComponent, CarritoComponent, FormsModule],
  templateUrl: './catalogo.html',
  styleUrl: './catalogo.css',
})

export class CatalogoComponent implements OnInit {
  products: Product[] = [];
  productosOriginales: Product[] = []
  busqueda: string = '';
  categoriasSeleccionadas: string[] = [];
  renderKey = 0;
  menuCategoriasAbierto = false;
  cargando = false;

  constructor(private productsService: ProductsService, private carritoService: CarritoService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos(): void {
    this.cargando = true;
    this.productsService.getaProductos(this.categoriasSeleccionadas).subscribe({
      next: (data) => {
        this.productosOriginales = [...data];
        this.products = [...data];
        this.cargando = false;
        this.renderKey++;
        console.log("Productos recibidos:", data);
        this.cdr.detectChanges() 
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
    this.busqueda = '';
    this.renderKey++;
    this.cdr.detectChanges() 
  }
  
  toggleMenuCategorias() {
    this.menuCategoriasAbierto = !this.menuCategoriasAbierto;
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