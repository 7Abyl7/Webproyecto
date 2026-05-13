import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})

export class PaypalService {
    private http = inject(HttpClient);
    private apiUrl = `${environment.apiUrl}/paypal`;

    crearOrden (payload: { items: any[]; subtotal: number}) {
        return this.http.post<{id: String; status: String}>(`${this.apiUrl}/createOrder`, payload);
    }

    capturarOrden(data: any) {
        return this.http.post<any>(`${this.apiUrl}/captureOrder`, data)
    }
}