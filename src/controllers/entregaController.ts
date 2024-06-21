import { NextFunction, Request, Response } from "express";
import { getAll, save, update, remove } from "../services/entregaService";
import { EntregaType } from "../types/serviceTypes";

export const getEntregas = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const entregas = await getAll();
    res.status(200).json(entregas);
  } catch (error) {
    next(error);
  }
};

export const saveEntregas = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    asignacionId,
    hospitalId,
    insumoId,
    cantidadEntregada,
    fechaEntrega,
    borrado,
  } = req.body;
  let entrega: EntregaType = {
    asignacionId,
    hospitalId,
    insumoId,
    cantidadEntregada,
    fechaEntrega,
    borrado,
  };
  try {
    const newEntrega = await save(entrega);
    res.status(201).json(newEntrega);
  } catch (error) {
    next(error);
  }
};

export const updateEntregas = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const {
    asignacionId,
    hospitalId,
    insumoId,
    cantidadEntregada,
    fechaEntrega,
    borrado,
  } = req.body;
  const entrega: EntregaType = {
    asignacionId,
    hospitalId,
    insumoId,
    cantidadEntregada,
    fechaEntrega,
    borrado,
  };
  try {
    let updated = await update(Number(id), entrega);
    res.status(200).json(updated);
  } catch (error) {
    next(error);
  }
};

export const removeEntregas = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    await remove(Number(id));
    res.status(200).send(`Entrega con id ${id} eliminado con éxito`);
  } catch (error) {
    next(error);
  }
};
