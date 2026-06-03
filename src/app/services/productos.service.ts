import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable} from 'rxjs';
import { Product } from '../models/producto.model';

@Injectable({ providedIn: 'root' })
export class ProductsService {
    private apiUrl = 'http://localhost:3000/api/productos';

   constructor(private http: HttpClient) {}

   getaProductos(categoria: string[] = []):Observable<Product[]> {
        let url = `${this.apiUrl}`;
        if (categoria.length > 0) {
         url += `?categoria=${categoria.join(',')}`;
        }
        return this.http.get<Product[]>(url);
   }

   obtenerHistorial(idCliente: number) {
      return this.http.get<any[]>(`http://localhost:3000/api/historial/${idCliente}`);
   }

   agregarProducto(producto: Product) {
      return this.http.post(`${this.apiUrl}`, producto);
   }

   eliminarProducto(id: number) {
      return this.http.delete(`${this.apiUrl}/${id}`);
   }
   editarProducto(id: number, producto: Product) {
      return this.http.put(`http://localhost:3000/api/productos/${id}`, producto);
   }

   private getText(parent:Element,tag:string):string {
      return parent.getElementsByTagName(tag)[0]?.textContent?.trim()??'';
   }

   private getNumber(parent: Element, tag:string):number {
      const value =this.getText(parent,tag);
      const n=Number(value);
      return Number.isFinite(n) ? n : 0;
   }
}