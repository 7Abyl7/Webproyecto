import { Component } from '@angular/core';
import { Product } from '../../../models/producto.model';
import { ProductCardComponent } from '../product-card/product-card';
import { ProductsService } from '../../../services/productos.service';

@Component({
  selector: 'app-catalogo',
  imports: [ProductCardComponent],
  templateUrl: './catalogo.html',
  styleUrl: './catalogo.css',
})
export class Catalogo {
  products:Product[] = [];
  constructor(private productsService:ProductsService) {
    this.products = this.productsService.getAll();
  }
}
