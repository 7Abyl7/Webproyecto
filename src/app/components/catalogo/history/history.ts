import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { CurrencyPipe, NgClass } from '@angular/common';
import { HistorialCompra } from '../../../models/history.model';
import { UserService } from '../../../services/user.service';
import { ProductsService } from '../../../services/productos.service';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CurrencyPipe, NgClass],
  templateUrl: './history.html',
  styleUrl: './history.css',
})
export class HistoryComponent {
  historial: HistorialCompra[] = [];

  constructor(private userService: UserService, private productsService: ProductsService) {}

  ngOnInit(): void {
    const id = this.userService.getUser()?.id;
    this.productsService
        .obtenerHistorial(id)
        .subscribe({
            next: (data) => {
                this.historial = data;
            },
            error: (err) => {
                console.error(err);
            }
        });
  }
}