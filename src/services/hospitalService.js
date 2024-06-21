import { Hospital } from "../config/db";


const getAll = async () => {
  return (await Hospital.findAll()) as unknown as [];
};

const getByName = async (name) => {
  let hospitalFound = (await Hospital.findOne({
    where: { nombre: name },
  })) 
  if (!hospitalFound) {
    throw new Error("Not Found");
  }

  return hospitalFound;
};

const save = async (hospital ) => {
  return await Hospital.create({
    nombre: hospital.nombre,
    numeroCasosCovidUltimoMes: hospital.numeroCasosCovidUltimoMes,
  });
};

const update = async (id, updated ) => {
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

const remove = async (id) => {
  await Hospital.update(
    { borrado: true },
    {
      where: { hospitalId: id },
    }
  );
};

export { getAll, getByName, save, update, remove };
