import { Hospital } from "../config/db";
import { HospitalType } from "../types/serviceTypes";

const getAll = async (): Promise<HospitalType[]> => {
  return (await Hospital.findAll()) as unknown as HospitalType[];
};

const getByName = async (name: string): Promise<HospitalType | null> => {
  return (await Hospital.findOne({
    where: { nombre: name },
  })) as unknown as HospitalType | null;
};

const save = async (hospital: HospitalType) => {
  return await Hospital.create({
    nombre: hospital.nombre,
    numeroCasosCovidUltimoMes: hospital.numeroCasosCovidUltimoMes,
  });
};

const update = async (id: number, updated: HospitalType) => {
  await Hospital.update(
    {
      nombre: updated.nombre,
      numeroCasosCovidUltimoMes: updated.numeroCasosCovidUltimoMes,
      borrado: updated.borrado,
    },
    {
      where: { hospitalId: id },
    }
  );
  const updatedHospital = await Hospital.findByPk(id);
  return updatedHospital;
};

const remove = async (id: number) => {
  await Hospital.update(
    { borrado: true },
    {
      where: { hospitalId: id },
    }
  );
};

export { getAll, getByName, save, update, remove };
