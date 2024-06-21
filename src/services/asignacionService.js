import { AsignacionInsumo } from "../config/db";
import { AsignacionType } from "../types/serviceTypes";

const getAll = async () => {
  return await AsignacionInsumo.findAll();
};

const getById = async (id: number) => {
  let asignaciones: any = await AsignacionInsumo.findAll({
    where: { hospitalId: id },
  });

  if (!asignaciones) {
    throw new Error("Not Found");
  }

  return asignaciones;
};

const save = async (asignacion: AsignacionType) => {
  return await AsignacionInsumo.create(asignacion);
};

const update = async (id: number, asignacion: AsignacionType) => {
  try {
    const [updateCount] = await AsignacionInsumo.update(
      {
        cantidadAsignada: asignacion.cantidadAsignada,
        borrado: asignacion.borrado,
        asignado: asignacion.asignado,
      },
      {
        where: { asignacionId: id },
      }
    );

    if (updateCount === 0) {
      throw new Error("No se encontró la asignación o no se pudo actualizar");
    }

    const updated = await AsignacionInsumo.findByPk(id);
    if (!updated) {
      throw new Error("Error al recuperar la asignación actualizada");
    }

    return updated;
  } catch (error) {
    console.log(error);
  }
};

const remove = async (id: number) => {
  await AsignacionInsumo.update(
    { borrado: true },
    {
      where: { asignacionId: id },
    }
  );
};

export { getAll, getById, save, update, remove };
