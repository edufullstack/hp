import { Insumo } from "../config/db";

const getAll = async () => {
  return await Insumo.findAll();
};
const getById = async (id) => {
  let insumos = await Insumo.findAll({
    where: { insumoId: id },
  });

  if (!insumos) {
    throw new Error("Not Found");
  }

  return insumos;
};

const save = async (insumo) => {
  return await Insumo.create(insumo);
};

const update = async (id, insumo) => {
  await Insumo.update(
    {
      tipo: insumo.tipo,
      cantidadTotalEnBodega: insumo.cantidadTotalEnBodega,
      cantidadDisponible: insumo.cantidadDisponible,
      borrado: insumo.borrado,
    },
    {
      where: { insumoId: id },
    }
  );
  const updated = await Insumo.findByPk(id);
  return updated;
};

const remove = async (insumoId) => {
  await Insumo.update(
    { borrado: true },
    {
      where: { insumoId },
    }
  );
};

export { getAll, getById, save, update, remove };
