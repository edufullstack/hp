import {
  getAll,
  getById,
  save,
  update,
  remove,
} from "../services/insumoService";
import { InsumoType } from "../types/serviceTypes";

export const getInsumos = async (req, res, next) => {
  try {
    const insumos = await getAll();
    res.status(200).json(insumos);
  } catch (error) {
    next(error);
  }
};
export const getInsumosById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const insumos = await getById(Number(id));
    res.status(200).json(insumos);
  } catch (error) {
    next(error);
  }
};

export const saveInsumo = async (req, res, next) => {
  try {
    const { tipo, cantidadTotalEnBodega, cantidadDisponible, borrado } =
      req.body;
    const insumo = {
      tipo,
      cantidadTotalEnBodega,
      cantidadDisponible,
      borrado,
    };
    const saved = await save(insumo);
    res.status(201).json(saved);
  } catch (error) {
    next(error);
  }
};

export const updateInsumo = async (req, res, next) => {
  const { id } = req.params;
  const { tipo, cantidadTotalEnBodega, cantidadDisponible, borrado } = req.body;
  const insumo = {
    tipo,
    cantidadTotalEnBodega,
    cantidadDisponible,
    borrado,
  };
  try {
    let updated = await update(Number(id), insumo);
    res.status(200).json(updated);
  } catch (error) {
    next(error);
  }
};

export const removeInsumo = async (req, res, next) => {
  const { insumoId } = req.params;
  try {
    await remove(Number(insumoId));
    res.status(200).json(`Insumo con id ${insumoId} eliminado con éxito`);
  } catch (error) {
    next(error);
  }
};
