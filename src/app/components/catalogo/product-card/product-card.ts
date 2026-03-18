import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CurrencyPipe, NgClass } from '@angular/common';
import { Product } from '../../../models/producto.model';
import { CarritoService } from '../../../services/carrito.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CurrencyPipe, NgClass],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCardComponent {
  @Input({ required:true })product!:Product;
  @Input() enCarrito: boolean = false;
  @Output() add = new EventEmitter<Product>();

  onAdd() {
    this.add.emit(this.product);
  }
}