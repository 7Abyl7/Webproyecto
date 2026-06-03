import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })

export class AuthService {
    correo = '';
    private apiUrl = 'http://localhost:3000/api/auth';
    
    constructor(private http: HttpClient) {}

    login(data: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/login`, data);
    }

    register(data: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/register`, data);
    }

    saveToken(token: string): void {
        localStorage.setItem('token', token);
    }

    getToken(): string | null {
        return localStorage.getItem('token');
    }

    getCorreo(): string | null {
        return this.correo;
    }

    logout(): void {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }

    isLoggedIn(): boolean {
        return !!this.getToken();
    }

    cambiarPassword(data: any): Observable<any> {
        return this.http.put(`${this.apiUrl}/cambiar-password`, data);
    }

    recuperarPassword(data: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/recuperar-password`, data);
    }

    restablecerPassword(data: any) {
        return this.http.put(`${this.apiUrl}/restablecer-password`, data);
    }
}