import { Component } from '@angular/core';
import { Product } from '../../../models/producto.model';
import { ProductCardComponent } from '../product-card/product-card';
import { ProductsService } from '../../../services/productos.service';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './catalogo.html',
  styleUrl: './catalogo.css',
})
export class CatalogoComponent {
  products: Product[] = [];

  constructor(private productsService: ProductsService) {
    this.productsService.getAll().subscribe(data => {
      this.products = data;
    });
  }
}
