import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import { Product } from '../models/producto.model';

@Injectable({ providedIn: 'root' })
export class ProductsService {
    
    constructor(private http: HttpClient) {}
    getAll():Observable<Product[]> {
        return this.http.get('/assets/productos.xml',{responseType:'text'}).pipe(map((xmlText)=>this.parseProductsXml(xmlText)));
    }

    private parseProductsXml(xmlText:string):Product[]{
        const parser=new DOMParser();
        const doc=parser.parseFromString(xmlText, 'application/xml');
        if(doc.getElementsByTagName('parseerror').length > 0) {
            return [];
        }

        const nodes = Array.from(doc.getElementsByTagName('producto'));
        return nodes.map((node) => ({
            id:this.getNumber(node,'id'),
            precio:this.getNumber(node,'precio'),
            nombre:this.getText(node,'nombre'),
            resolucion:this.getText(node,'resolucion'),
            autor:this.getText(node,'autor'),
            URLImg:this.getText(node,'URLImg'),
        }));
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