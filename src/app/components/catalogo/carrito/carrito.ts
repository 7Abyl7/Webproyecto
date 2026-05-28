import { Component, computed, ChangeDetectorRef, OnInit, AfterViewInit, ViewChild, inject, ElementRef } from '@angular/core';
import { Product } from '../../../models/producto.model';
import { CurrencyPipe } from '@angular/common';
import { CarritoService } from '../../../services/carrito.service';
import { UserService } from '../../../services/user.service';
import { PaypalService } from '../../../services/paypal.service';
import { Router, RouterOutlet, RouterLinkWithHref } from '@angular/router';
import { RouterLink } from '@angular/router';
import { Signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';

declare const paypal: any;

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CurrencyPipe, RouterOutlet, RouterLinkWithHref, RouterLink],
  templateUrl: './carrito.html',
  styleUrl: './carrito.css',
})

export class CarritoComponent implements AfterViewInit, OnInit {
  @ViewChild('paypalButtonContainer')
  paypalButtonContainer!: ElementRef<HTMLDivElement>;

  private paypalService = inject(PaypalService);
  mostrarModal = false;
  mensajeModal = '';
  carrito: Signal<Product[]>;
  subtotal = computed(() => this.carritoService.subtotal());
  total = computed(() => this.carritoService.total());

  constructor(private carritoService: CarritoService, private cdr: ChangeDetectorRef, private router: Router, private userService: UserService) {
    this.carrito = this.carritoService.productos;
  }

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

  quitar(id: number) {
    this.carritoService.quitar(id);
  }

  vaciar() {
    this.carritoService.vaciar();
  }

  estaEnCarrito(id: number) {
    this.carritoService.estaEnCarrito(id);
  }

  modificarCarrito(producto: Product) {
    this.carritoService.modificarCarrito(producto);
  }

  checkout() {
    this.router.navigate(['checkout']);
  }
  
    private renderPaypalButton(): void {
      if (!this.userService.getUser()?.id) {
        this.ponerModal('Debes iniciar sesión para pagar');
        return;
      }
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
                subtotal: this.subtotal()
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
            const capture = firstValueFrom(
              this.paypalService.capturarOrden({orderId: data.orderID, id_cliente: this.obtenerIdCliente(), items: this.carrito(), subtotal: this.subtotal()})
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

    private obtenerIdCliente(): number {
      const user = this.userService.getUser();
      return user?.id ?? null;
    }
  
    ponerModal(mensaje: string) {
      this.mensajeModal = mensaje;
      this.mostrarModal = true;
      setTimeout(() => {
        this.cdr.detectChanges();
      }, 0);
    }
  
    cerrarModal() {
      this.mostrarModal = false;
    }
}
