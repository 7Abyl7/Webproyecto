import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../../models/producto.model';
import { ProductCardComponent } from '../product-card/product-card';
import { ProductsService } from '../../../services/productos.service';

@Component({
  selector: 'app-catalogo',
  imports: [ProductCardComponent, CommonModule],
  templateUrl: './catalogo.html',
  styleUrl: './catalogo.css',
})
export class CatalogoComponent implements OnInit {
  products$ = this.productsService.getAll$();

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    // Los productos se cargan automáticamente desde el Observable
  }
}
