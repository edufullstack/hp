import { NextFunction, Request, Response } from "express";
import {
  getAll,
  getById,
  save,
  update,
  remove,
} from "../services/asignacionService";

export const getAsignaciones = async (req, res, next) => {
  try {
    const asignaciones = await getAll();
    res.status(200).json(asignaciones);
  } catch (error) {
    next(error);
  }
};
export const getAsignacionesById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const asignaciones = await getById(Number(id));
    res.status(200).json(asignaciones);
  } catch (error) {
    next(error);
  }
};

export const saveAsignaciones = async (req, res, next) => {
  const {
    hospitalId,
    insumoId,
    cantidadAsignada,
    fechaAsignacion,
    borrado,
    asignado,
  } = req.body;
  let asignacion = {
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

export const updateAsignaciones = async (req, res, next) => {
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
  const asignacion = {
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

export const removeAsignaciones = async (req, res, next) => {
  const { id } = req.params;
  try {
    await remove(Number(id));
    res.status(200).json(`Asignacion con id ${id} eliminado con éxito`);
  } catch (error) {
    next(error);
  }
};
