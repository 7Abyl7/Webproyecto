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
    }, {
        id: 2,
        precio: 200,
        nombre: "Volcano2",
        resolucion: "3200x2048",
        autor: "Karla Regina Maiz Oregano",
        URLImg: "udwhdkgsgsfsdgs"
    }, {
        id: 3,
        precio: 240,
        nombre: "CuevaHielo1",
        resolucion: "3200x2048",
        autor: "Jatniel Guapo Diaz",
        URLImg: "udwhdkuhius"
    }, {
        id: 4,
        precio: 240,
        nombre: "CuevaHielo2",
        resolucion: "3200x2048",
        autor: "Adrian Suadero Quezadilla",
        URLImg: "udwhdsdgdsgkuhseiugfius"
    }, {
        id: 5,
        precio: 180,
        nombre: "CuidadMorada1",
        resolucion: "3200x2048",
        autor: "Karla Regina Maiz Oregano",
        URLImg: "udwhdkuhseijsiohugfius"
    }];
    getAll():Product[]{
        return this.products;
    }
}