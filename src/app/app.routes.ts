import { Routes } from '@angular/router';
import { CatalogoComponent } from './components/catalogo/catalogo/catalogo'
import { CarritoComponent } from './components/catalogo/carrito/carrito'
import { CheckoutComponent } from './components/catalogo/checkout/checkout'

export const routes: Routes = [
    { path: '', component :CatalogoComponent},
    { path: 'carrito', component: CarritoComponent },
    { path: 'checkout', component: CheckoutComponent},
    { path: '**', redirectTo: ''},
];
