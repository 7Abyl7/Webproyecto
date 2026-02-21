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

    /*private productsSubject = new BehaviorSubject<Product[]>([]);
    products$ = this.productsSubject.asObservable();

    constructor(private http: HttpClient) {
        this.loadProductsFromXML();
    }

    private loadProductsFromXML(): void {
        this.http.get('productos.xml', { responseType: 'text' }).subscribe({
            next: (xmlText) => {
                this.parseXML(xmlText);
            },
            error: (error) => {
                console.error('Error cargando productos.xml:', error);
                this.productsSubject.next([]);
            }
        });
    }

    private parseXML(xmlText: string): void {
        try {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlText, 'text/xml');

            if (xmlDoc.getElementsByTagName('parsererror').length > 0) {
                throw new Error('Error al parsear XML');
            }

            const productosElements = xmlDoc.getElementsByTagName('producto');
            const products: Product[] = [];

            for (let i = 0; i < productosElements.length; i++) {
                const productoElement = productosElements[i];
                const product: Product = {
                    id: parseInt(this.getElementValue(productoElement, 'id') || '0'),
                    precio: parseInt(this.getElementValue(productoElement, 'precio') || '0'),
                    nombre: this.getElementValue(productoElement, 'nombre') || '',
                    resolucion: this.getElementValue(productoElement, 'resolucion') || '',
                    autor: this.getElementValue(productoElement, 'autor') || '',
                    URLImg: this.getElementValue(productoElement, 'URLImg') || ''
                };
                products.push(product);
            }

            this.productsSubject.next(products);
        } catch (error) {
            console.error('Error al procesar XML:', error);
            this.productsSubject.next([]);
        }
    }

    private getElementValue(element: Element, tagName: string): string {
        const elements = element.getElementsByTagName(tagName);
        return elements.length > 0 ? (elements[0].textContent || '') : '';
    }

    getAll(): Product[] {
        return this.productsSubject.getValue();
    }

    getAll$(): Observable<Product[]> {
        return this.products$;
    }*/

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