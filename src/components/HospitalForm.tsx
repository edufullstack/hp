import { saveHospital } from "@/services/organizacionDash.services";
import React, { useState } from "react";

const HospitalForm = ({ onActualizar }: { onActualizar: any }) => {
  const [nombre, setNombre] = useState("");
  const [numeroCasosCovidUltimoMes, setNumeroCasosCovidUltimoMes] =
    useState("");

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const nuevoHospital = { nombre, numeroCasosCovidUltimoMes };
    console.log(nuevoHospital);
    saveHospital(nuevoHospital);
    setNombre("");
    setNumeroCasosCovidUltimoMes("");
    onActualizar();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nombre:</label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
      </div>
      <div>
        <label>Número de Casos de Covid del Último Mes:</label>
        <input
          type="number"
          value={numeroCasosCovidUltimoMes}
          onChange={(e) => setNumeroCasosCovidUltimoMes(e.target.value)}
        />
      </div>
      <button type="submit">Crear</button>
    </form>
  );
};

export default HospitalForm;
