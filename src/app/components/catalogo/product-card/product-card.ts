import { Component, Input} from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Product } from '../../../models/producto.model';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCardComponent {
  @Input({required:true})product!:Product;
}