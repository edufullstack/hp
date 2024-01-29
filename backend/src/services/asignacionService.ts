import { AsignacionInsumo } from "../config/db";
import { AsignacionType } from "../types/serviceTypes";

const getAll = async () => {
  return await AsignacionInsumo.findAll();
};

const save = async (asignacion: AsignacionType) => {
  return await AsignacionInsumo.create(asignacion);
};

const update = async (id: number, asignacion: AsignacionType) => {
  await AsignacionInsumo.update(
    {
      cantidadAsignada: asignacion.cantidadAsignada,
      borrado: asignacion.borrado,
    },
    {
      where: { asignacionId: id },
    }
  );
  const updated = await AsignacionInsumo.findByPk(id);
  return updated;
};

const remove = async (id: number) => {
  await AsignacionInsumo.update(
    { borrado: true },
    {
      where: { asignacionId: id },
    }
  );
};

export { getAll, save, update, remove };
