import { Product } from './producto.model';

export interface HistorialCompra {
    order_id: string;
    fecha: string;
    total: number;
    productos: Product[];
}