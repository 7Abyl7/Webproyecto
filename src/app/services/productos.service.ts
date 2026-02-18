import { Injectable } from '@angular/core';
import { Product } from '../models/producto.model';
@Injectable({providedIn:'root'})

export class ProductsServices {
    private readonly products:Product[] = [{
        id: 1,
        precio: 200,
        nombre: "Volcano1",
        resolucion: "3200x2048",
        autor: "Adrian Suadero Quezadilla",
        URLImg: "udwhdkuhseiugfius"
    }];
    getAll():Product[]{
        return this.products;
    }
}