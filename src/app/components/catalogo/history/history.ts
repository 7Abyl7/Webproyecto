import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CurrencyPipe, NgClass } from '@angular/common';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CurrencyPipe, NgClass],
  templateUrl: './history.html',
  styleUrl: './history.css',
})
export class HistoryComponent {

}