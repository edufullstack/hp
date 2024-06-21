import { NextFunction, Request, Response } from "express";
import {
  getAll,
  getById,
  save,
  update,
  remove,
} from "../services/asignacionService";
import { AsignacionType } from "../types/serviceTypes";

export const getAsignaciones = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const asignaciones = await getAll();
    res.status(200).json(asignaciones);
  } catch (error) {
    next(error);
  }
};
export const getAsignacionesById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const asignaciones = await getById(Number(id));
    res.status(200).json(asignaciones);
  } catch (error) {
    next(error);
  }
};

export const saveAsignaciones = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    hospitalId,
    insumoId,
    cantidadAsignada,
    fechaAsignacion,
    borrado,
    asignado,
  } = req.body;
  let asignacion: AsignacionType = {
    hospitalId,
    insumoId,
    cantidadAsignada,
    fechaAsignacion,
    borrado,
    asignado,
  };
  try {
    const newAsignacion = await save(asignacion);
    res.status(201).json(newAsignacion);
  } catch (error) {
    next(error);
  }
};

export const updateAsignaciones = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  console.log(id);
  const {
    hospitalId,
    insumoId,
    cantidadAsignada,
    fechaAsignacion,
    borrado,
    asignado,
  } = req.body;
  const asignacion: AsignacionType = {
    hospitalId,
    insumoId,
    cantidadAsignada,
    fechaAsignacion,
    borrado,
    asignado,
  };
  console.log(asignacion);

  try {
    let updated = await update(Number(id), asignacion);
    res.status(200).json(updated);
  } catch (error) {
    next(error);
  }
};

export const removeAsignaciones = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    await remove(Number(id));
    res.status(200).json(`Asignacion con id ${id} eliminado con éxito`);
  } catch (error) {
    next(error);
  }
};
