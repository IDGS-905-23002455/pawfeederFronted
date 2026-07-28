export interface Componente {
  id: number;
  nombre: string;
  stock: number;
  unidadMedida: string;
}

export interface ProductoTerminado {
  id: number;
  nombre: string;
  stock: number;
  estado: string;
}
