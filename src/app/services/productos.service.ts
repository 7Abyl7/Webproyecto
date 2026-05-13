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

     private getText(parent:Element,tag:string):string{
        return parent.getElementsByTagName(tag)[0]?.textContent?.trim()??'';
     }

     private getNumber(parent: Element, tag:string):number
     {
        const value =this.getText(parent,tag);
        const n=Number(value);
        return Number.isFinite(n) ? n : 0;
     }
}