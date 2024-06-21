import {
  getAll,
  getByName,
  save,
  update,
  remove,
} from "../services/hospitalService";
import { HospitalType } from "../types/serviceTypes";

export const getHospitals = async (req, res, next) => {
  const { name } = req.query;

  try {
    let hospitals;

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

export const saveHospital = async (req, res, next) => {
  const { nombre, numeroCasosCovidUltimoMes, borrado } = req.body;
  let hospital = { nombre, numeroCasosCovidUltimoMes, borrado };
  try {
    const newHospital = await save(hospital);
    res.status(201).json(newHospital);
  } catch (error) {
    next(error);
  }
};

export const updateHospital = async (req, res, next) => {
  const { id } = req.params;
  const { nombre, numeroCasosCovidUltimoMes, borrado } = req.body;
  const hospital = { nombre, numeroCasosCovidUltimoMes, borrado };
  try {
    let updated = await update(Number(id), hospital);
    res.status(200).json(updated);
  } catch (error) {
    next(error);
  }
};

export const removeHospital = async (req, res, next) => {
  const { id } = req.params;
  try {
    await remove(Number(id));
    res.status(200).json(`Hospital con id ${id} eliminado con éxito`);
  } catch (error) {
    next(error);
  }
};
