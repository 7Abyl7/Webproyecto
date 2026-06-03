import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CurrencyPipe, NgClass } from '@angular/common';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CurrencyPipe, NgClass],
  templateUrl: './inventario.html',
  styleUrl: './inventario.css',
})
export class InventarioComponent {

}