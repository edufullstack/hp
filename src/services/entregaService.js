import { EntregaInsumo } from "../config/db";

const getAll = async () => {
  return await EntregaInsumo.findAll();
};

const save = async (entrega) => {
  return await EntregaInsumo.create(entrega);
};

const update = async (id, entrega) => {
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

const remove = async (id) => {
  await EntregaInsumo.update(
    { borrado: true },
    {
      where: { entregaId: id },
    }
  );
};

export { getAll, save, update, remove };
