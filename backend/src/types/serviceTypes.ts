export type HospitalType = {
  hospitalId?: number;
  nombre: string;
  numeroCasosCovidUltimoMes: number;
  borrado: boolean;
};

export type InsumoType = {
  insumoId?: number;
  tipo: string;
  cantidadTotalEnBodega: number;
  cantidadDisponible: number;
  borrado: boolean;
};

export type EntregaType = {
  entregaId?: number;
  asignacionId: number;
  hospitalId: number;
  insumoId: number;
  cantidadEntregada: number;
  fechaEntrega?: Date;
  borrado: boolean;
};

export type AsignacionType = {
  asignacionId?: number;
  hospitalId: number;
  insumoId: number;
  cantidadAsignada: number;
  fechaAsignacion?: Date;
  borrado: boolean;
};
