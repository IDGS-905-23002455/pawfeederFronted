import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth';
import { CompraService, Compra, ProductoCatalogo } from '../../services/compra';
import { OpinionService } from '../../services/opinion';
import { Opinion } from '../reviews/opinion';

@Component({
  selector: 'app-mis-compras',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './mis-compras.html',
  styleUrl: './mis-compras.css'
})
export class MisComprasComponent implements OnInit {
  private auth = inject(AuthService);
  private compraService = inject(CompraService);
  private opinionService = inject(OpinionService);

  private catalogoBase: ProductoCatalogo[] = [
    { id: 1, nombre: 'PawFeeder Standard', precio: 1899, descripcion: 'Dispensador inteligente de croquetas con programación básica y control desde la app.' },
    { id: 2, nombre: 'PawFeeder Premium', precio: 2499, descripcion: 'Dispensador con WiFi, sensor ultrasónico de nivel, porciones precisas y horarios desde cualquier lugar.' },
    { id: 3, nombre: 'PawFeeder Pro Max', precio: 3299, descripcion: 'Versión avanzada con doble tolva, notificaciones en tiempo real y soporte para varias mascotas.' }
  ];

  usuarioId = 0;
  usuarioNombre = '';

  catalogo: ProductoCatalogo[] = [];
  cargandoCatalogo = true;
  errorCatalogo = false;

  compras: Compra[] = [];

  compraEnReview: Compra | null = null;
  compraEnReviewId: number | null = null;
  reviewCalificacion = 5;
  reviewComentario = '';
  enviandoReview = false;
  reviewError = '';

  mensajeExito = '';
  mensajeError = '';

  ngOnInit(): void {
    const usuario = this.auth.currentUser;
    if (!usuario) return;

    this.usuarioId = usuario.id;
    this.usuarioNombre = usuario.nombre;
    this.cargarCompras();
    this.cargarCatalogo();
  }

  cargarCompras(): void {
    this.compras = this.compraService.getCompras(this.usuarioId);

    if (this.comprasPendientes.length === 0) {
      this.compraEnReview = null;
      this.compraEnReviewId = null;
      return;
    }

    if (!this.compraEnReview || !this.compras.some(c => c.id === this.compraEnReview?.id)) {
      this.seleccionarCompra(this.comprasPendientes[0]);
    }
  }

  get comprasPendientes(): Compra[] {
    return this.compras.filter(c => !c.review);
  }

  seleccionarCompra(compra: Compra): void {
    this.compraEnReview = compra;
    this.compraEnReviewId = compra.id;
    this.reviewCalificacion = 5;
    this.reviewComentario = '';
    this.reviewError = '';
  }

  onSelectProducto(): void {
    const compra = this.compras.find(c => c.id === this.compraEnReviewId);
    if (compra) this.seleccionarCompra(compra);
  }

  cargarCatalogo(): void {
    this.compraService.getProductos().subscribe({
      next: (productos) => {
        this.catalogo = this.enriquecerCatalogo(productos);
        this.cargandoCatalogo = false;
      },
      error: () => {
        this.catalogo = this.catalogoBase;
        this.cargandoCatalogo = false;
        this.errorCatalogo = true;
      }
    });
  }

  enriquecerCatalogo(productos: ProductoCatalogo[]): ProductoCatalogo[] {
    if (!productos || productos.length === 0) {
      return this.catalogoBase;
    }

    return productos.map(p => {
      const base = this.catalogoBase.find(b => b.nombre.toLowerCase() === p.nombre.toLowerCase());
      return {
        id: p.id,
        nombre: p.nombre,
        stock: p.stock,
        estado: p.estado,
        precio: base?.precio ?? 1999,
        descripcion: base?.descripcion ?? 'Dispensador inteligente de croquetas PawFeeder.'
      };
    });
  }

  comprar(producto: ProductoCatalogo): void {
    const compra = this.compraService.registrarCompra(this.usuarioId, producto);
    this.cargarCompras();
    this.mensajeError = '';
    this.mensajeExito = `Compra de "${producto.nombre}" registrada correctamente.`;
    document.getElementById('mis-compras')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  abrirReview(compra: Compra): void {
    this.seleccionarCompra(compra);
    document.getElementById('dejar-opinion')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  enviarReview(): void {
    if (!this.compraEnReview) return;

    const comentario = this.reviewComentario.trim();
    if (!comentario) {
      this.reviewError = 'Escribe un comentario sobre el producto antes de publicar.';
      return;
    }
    if (comentario.length > 300) {
      this.reviewError = 'El comentario no puede superar los 300 caracteres.';
      return;
    }

    const compra = this.compraEnReview;
    const opinion: Opinion = {
      nombreUsuario: this.usuarioNombre,
      detallesMascota: `Producto: ${compra.nombreProducto}`,
      calificacion: this.reviewCalificacion,
      comentario,
      fecha: new Date().toLocaleDateString('es-MX')
    };

    this.enviandoReview = true;
    this.reviewError = '';

    this.opinionService.crearOpinion(opinion).subscribe({
      next: () => {
        this.compraService.guardarReview(this.usuarioId, compra.id, {
          calificacion: this.reviewCalificacion,
          comentario,
          fecha: opinion.fecha
        });
        this.enviandoReview = false;
        this.compraEnReview = null;
        this.compraEnReviewId = null;
        this.cargarCompras();
        this.mensajeExito = `¡Gracias! Tu opinión sobre "${compra.nombreProducto}" fue publicada en la sección de Comentarios.`;
      },
      error: (err) => {
        this.enviandoReview = false;
        this.reviewError = `No se pudo publicar la opinión (${err?.status ?? 'sin respuesta'}). Intenta de nuevo.`;
      }
    });
  }

  tieneReview(compra: Compra): boolean {
    return !!compra.review;
  }

  get totalCompras(): number {
    return this.compras.reduce((acc, c) => acc + c.cantidad, 0);
  }

  get totalInvertido(): number {
    return this.compras.reduce((acc, c) => acc + c.precio * c.cantidad, 0);
  }

  get pendientesOpinion(): number {
    return this.compras.filter(c => !c.review).length;
  }

  obtenerEstrellas(calificacion: number): number[] {
    return Array(calificacion).fill(0);
  }

  obtenerEstrellasVacias(calificacion: number): number[] {
    return Array(Math.max(0, 5 - calificacion)).fill(0);
  }
}
