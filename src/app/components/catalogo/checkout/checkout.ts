import { AfterViewInit,  Component,  ElementRef,  ViewChild,  inject, ChangeDetectorRef, OnInit } from '@angular/core';
import { CarritoService } from '../../../services/carrito.service';
import { PaypalService } from '../../../services/paypal.service';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { firstValueFrom } from 'rxjs';

declare const paypal: any;

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css'
})
export class CheckoutComponent implements AfterViewInit, OnInit {
  @ViewChild('paypalButtonContainer')
  paypalButtonContainer!: ElementRef<HTMLDivElement>;

  private carritoService = inject(CarritoService);
  private paypalService = inject(PaypalService);

  mostrarModal = false;
  mensajeModal = '';
  carrito = this.carritoService.productos;
  total = () => this.carritoService.total();

  constructor(private cdr: ChangeDetectorRef){}

  ngOnInit(): void {
    setTimeout(() => {
      this.cdr.detectChanges();
    }, 0);
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.renderPaypalButton();
    }, 0);
  }

  private renderPaypalButton(): void {
    if (this.carrito().length === 0) {
      return;
    }
    if (typeof paypal === 'undefined') {
      this.ponerModal('No se cargó el SDK de PayPal.');
      return;
    }
    if (!this.paypalButtonContainer) {
      return;
    }
    this.paypalButtonContainer.nativeElement.innerHTML = '';

    paypal.Buttons({
      createOrder: async () => {
        try {
          const response = await firstValueFrom(
            this.paypalService.crearOrden({
              items: this.carrito(),
              total: this.total()
            })
          );
          return response.id;
        } catch (error) {
          console.error('Error al crear la orden:', error);
          this.ponerModal('No se pudo crear la orden.');
          throw error;
        }
      },

      onApprove: async (data: any) => {
        try {
          const capture = await firstValueFrom(
            this.paypalService.capturarOrden({orderId: data.orderID, items: this.carrito(), total: this.total()})
          );
          console.log('Pago capturado:', capture);
          this.ponerModal('Pago realizado correctamente.');
          this.carritoService.exportarXML();
          this.carritoService.vaciar();
          this.paypalButtonContainer.nativeElement.innerHTML = '';
        } catch (error) {
          console.error('Error al capturar el pago:', error);
          this.ponerModal('Ocurrio un error al capturar el pago.');
        }
      },

      onCancel: () => {
        this.ponerModal('El usuario cancelo el pago.');
      },

      onError: (error: any) => {
        console.error('Error PayPal:', error);
        this.ponerModal('Error en el proceso de PayPal.');
      }
    }).render(this.paypalButtonContainer.nativeElement);
  }

  ponerModal(mensaje: string) {
    this.mensajeModal = mensaje;
    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
  }
}