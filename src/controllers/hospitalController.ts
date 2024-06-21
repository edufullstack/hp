import { NextFunction, Request, Response } from "express";
import {
  getAll,
  getByName,
  save,
  update,
  remove,
} from "../services/hospitalService";
import { HospitalType } from "../types/serviceTypes";

export const getHospitals = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { name } = req.query;

  try {
    let hospitals: HospitalType[] | HospitalType | null;

    if (typeof name === "string" && name.trim() !== "") {
      const hospital = await getByName(name);
      hospitals = hospital ? [hospital] : [];
    } else {
      hospitals = await getAll();
    }
    res.status(200).json(hospitals);
  } catch (error) {
    next(error);
  }
};

export const saveHospital = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { nombre, numeroCasosCovidUltimoMes, borrado } = req.body;
  let hospital = { nombre, numeroCasosCovidUltimoMes, borrado };
  try {
    const newHospital = await save(hospital);
    res.status(201).json(newHospital);
  } catch (error) {
    next(error);
  }
};

export const updateHospital = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const { nombre, numeroCasosCovidUltimoMes, borrado } = req.body;
  const hospital: HospitalType = { nombre, numeroCasosCovidUltimoMes, borrado };
  try {
    let updated = await update(Number(id), hospital);
    res.status(200).json(updated);
  } catch (error) {
    next(error);
  }
};

export const removeHospital = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    await remove(Number(id));
    res.status(200).json(`Hospital con id ${id} eliminado con éxito`);
  } catch (error) {
    next(error);
  }
};
