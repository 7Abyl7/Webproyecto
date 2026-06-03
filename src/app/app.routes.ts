import { Routes } from '@angular/router';
import { authGuard } from './core/auth.guard';
import { CatalogoComponent } from './components/catalogo/catalogo/catalogo'
import { CarritoComponent } from './components/catalogo/carrito/carrito'
import { HistoryComponent } from './components/catalogo/history/history';
import { InventarioComponent } from './components/catalogo/inventario/inventario';
import { LoginComponent } from './components/catalogo/login/login';
import { PasswordComponent } from './components/catalogo/password/password';
import { RegisterComponent } from './components/catalogo/register/register';

export const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    { path: 'catalogo', component: CatalogoComponent},
    { path: 'carrito', component: CarritoComponent },
    { path: 'login', component: LoginComponent},
    { path: 'registro', component: RegisterComponent},
    { path: 'password', component: PasswordComponent},
    { path: 'historial', canActivate: [authGuard], component: HistoryComponent},
    { path: 'inventario', component: InventarioComponent},
    { path: '**', redirectTo: ''},
];
