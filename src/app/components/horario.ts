export interface Horario {
  id?: number;
  usuarioId: number;
  mascotaId: number | null;
  dispensadorId: number | null;
  nombre: string;
  icono: string;
  hora: string;
  lunes: boolean;
  martes: boolean;
  miercoles: boolean;
  jueves: boolean;
  viernes: boolean;
  sabado: boolean;
  domingo: boolean;
  porcionGramos: number;
  activo: boolean;
}
