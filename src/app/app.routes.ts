import { Routes } from '@angular/router';
import { authGuard } from './core/auth.guard';
import { CatalogoComponent } from './components/catalogo/catalogo/catalogo'
import { CarritoComponent } from './components/catalogo/carrito/carrito'
import { HistoryComponent } from './components/catalogo/history/history';
import { LoginComponent } from './components/catalogo/login/login';
import { ProfileComponent } from './components/catalogo/profile/profile';
import { RegisterComponent } from './components/catalogo/register/register';

export const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    { path: 'catalogo', component: CatalogoComponent},
    { path: 'carrito', component: CarritoComponent },
    { path: 'login', component: LoginComponent},
    { path: 'registro', component: RegisterComponent},
    { path: 'perfil', component: ProfileComponent},
    { path: 'historial', canActivate: [authGuard], component: HistoryComponent},
    { path: '**', redirectTo: ''},
];
