import { Injectable, signal } from '@angular/core'
import { Product } from '../models/producto.model'

@Injectable({ providedIn: 'root'})

export class CarritoService {
    private productosSignal = signal<Product[]>([]);
    productos = this.productosSignal.asReadonly();

    agregar(producto: Product) {
        this.productosSignal.update(lista => [...lista, producto]);
    }

    quitar(id: number) {
        this.productosSignal.update(lista => lista.filter(p => p.id !== id));
    }

    vaciar() {
        this.productosSignal.set([]);
    }

    subtotal(): number {
        return this.productosSignal().reduce((acc, p) => acc + (Number(p.precio) || 0), 0);
    }

    total(): number {
        return Number((this.subtotal() * 1.16).toFixed(2));
    }

    exportarXML() {
        const productos = this.productosSignal();
        let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<recibo>\n';
        for (const p of productos) {
            xml += ` <producto>\n`;
            xml += ` <id>${p.id}</id>\n`;
            xml += ` <nombre>${this.escapeXml(p.nombre)}</nombre>\n`;
            xml += ` <precio>${p.precio}</precio>\n`;
            xml += ` </producto>\n`;
        }
        xml += ` <subtotal>${this.subtotal()}</total>\n`;
        xml += ` <total>${this.total()}</total>\n`;
        xml += ` </recibo>\n`;
        const blob = new Blob([xml], { type: 'application/xml'});
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'recibo.xml';
        a.click();
        URL.revokeObjectURL(url);
    }

    estaEnCarrito(id: number): boolean {
        return this.productosSignal().some(p => p.id === id);
    }

    modificarCarrito(producto: Product) {
        if (this.estaEnCarrito(producto.id)) {
            this.quitar(producto.id);
        } 
        else {
            this.agregar(producto);
        }
}

    private escapeXml(value: string): string {
        return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&apos;')
    }
}