import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface ProductoCatalogo {
  id: number;
  nombre: string;
  stock?: number;
  estado?: string;
  precio: number;
  descripcion: string;
}

export interface ReviewGuardada {
  calificacion: number;
  comentario: string;
  fecha: string;
}

export interface Compra {
  id: number;
  productoId: number;
  nombreProducto: string;
  precio: number;
  cantidad: number;
  fecha: string;
  estado: string;
  review?: ReviewGuardada;
}

function getLocalStorage(): Storage | null {
  try {
    return typeof window !== 'undefined' && window.localStorage ? window.localStorage : null;
  } catch {
    return null;
  }
}

@Injectable({
  providedIn: 'root'
})
export class CompraService {
  private apiUrl = `${environment.apiUrl}/Productos`;

  constructor(private http: HttpClient) {}

  getProductos(): Observable<ProductoCatalogo[]> {
    return this.http.get<ProductoCatalogo[]>(this.apiUrl);
  }

  getCompras(usuarioId: number): Compra[] {
    const storage = getLocalStorage();
    if (!storage) return [];
    const raw = storage.getItem(this.clave(usuarioId));
    return raw ? (JSON.parse(raw) as Compra[]) : [];
  }

  registrarCompra(usuarioId: number, producto: ProductoCatalogo, cantidad = 1): Compra {
    const storage = getLocalStorage();
    if (!storage) throw new Error('Sin almacenamiento disponible');

    const compra: Compra = {
      id: Date.now(),
      productoId: producto.id,
      nombreProducto: producto.nombre,
      precio: producto.precio,
      cantidad,
      fecha: new Date().toLocaleDateString('es-MX'),
      estado: 'Entregado'
    };

    const compras = [compra, ...this.getCompras(usuarioId)];
    storage.setItem(this.clave(usuarioId), JSON.stringify(compras));
    return compra;
  }

  guardarReview(usuarioId: number, compraId: number, review: ReviewGuardada): void {
    const storage = getLocalStorage();
    if (!storage) return;

    const compras = this.getCompras(usuarioId);
    const compra = compras.find(c => c.id === compraId);
    if (compra) {
      compra.review = review;
      storage.setItem(this.clave(usuarioId), JSON.stringify(compras));
    }
  }

  private clave(usuarioId: number): string {
    return `pawfeeder_compras_${usuarioId}`;
  }
}
