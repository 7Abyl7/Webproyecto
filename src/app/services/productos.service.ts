import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/producto.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductsService {
    private productsSubject = new BehaviorSubject<Product[]>([]);
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
    }
}