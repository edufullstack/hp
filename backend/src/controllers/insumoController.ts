import { NextFunction, Request, Response } from "express";
import {
  getAll,
  getById,
  save,
  update,
  remove,
} from "../services/insumoService";
import { InsumoType } from "../types/serviceTypes";

export const getInsumos = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const insumos = await getAll();
    res.status(200).json(insumos);
  } catch (error) {
    next(error);
  }
};
export const getInsumosById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const insumos = await getById(Number(id));
    res.status(200).json(insumos);
  } catch (error) {
    next(error);
  }
};

export const saveInsumo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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

export const updateInsumo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const { tipo, cantidadTotalEnBodega, cantidadDisponible, borrado } = req.body;
  const insumo: InsumoType = {
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

export const removeInsumo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    await remove(Number(id));
    res.status(200).send(`Insumo con id ${id} eliminado con éxito`);
  } catch (error) {
    next(error);
  }
};
