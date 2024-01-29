import { EntregaInsumo } from "../config/db";
import { EntregaType } from "../types/serviceTypes";

const getAll = async () => {
  return await EntregaInsumo.findAll();
};

const save = async (entrega: EntregaType) => {
  return await EntregaInsumo.create(entrega);
};

const update = async (id: number, entrega: EntregaType) => {
  await EntregaInsumo.update(
    {
      cantidadEntregada: entrega.cantidadEntregada,
      fechaEntrega: entrega.fechaEntrega,
      borrado: entrega.borrado,
    },
    {
      where: { entregaId: id },
    }
  );
  const updated = await EntregaInsumo.findByPk(id);
  return updated;
};

const remove = async (id: number) => {
  await EntregaInsumo.update(
    { borrado: true },
    {
      where: { entregaId: id },
    }
  );
};

export { getAll, save, update, remove };
