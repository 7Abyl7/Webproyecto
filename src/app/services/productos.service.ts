import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import { Product } from '../models/producto.model';

@Injectable({ providedIn: 'root' })
export class ProductsService {
    private apiUrl = 'http://localhost:3000/api/productos';

    constructor(private http: HttpClient) {}
    getaProductos():Observable<Product[]> {
        return this.http.get<Product[]>(this.apiUrl);
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