import { saveHospital } from "@/services/organizacionDash.services";
import React, { useState } from "react";
import validateHospitalForm from "@/utils/validateHospitalForm";
import Swal from "sweetalert2";

const HospitalForm = ({ onActualizar }: { onActualizar: any }) => {
  const [errors, setErrors] = useState<any>({});
  const [input, setInput] = useState({
    nombre: "",
    numeroCasosCovidUltimoMes: "",
  });
  const [disabled, setDisabled] = useState(true);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const nuevoHospital = {
      nombre: input.nombre,
      numeroCasosCovidUltimoMes: input.numeroCasosCovidUltimoMes,
    };

    Swal.fire("Error", "Error en registro de casos, intente de nuevo", "error");
    if (Object.keys(errors).length === 0) {
      let saved = await saveHospital(nuevoHospital);
      setInput({
        nombre: "",
        numeroCasosCovidUltimoMes: "",
      });
      onActualizar();
      if (saved.error) {
        Swal.fire(
          "Error",
          "Error en registro de casos, intente de nuevo",
          "error"
        );
        return;
      }
      Swal.fire(
        "Éxito",
        "Registro de casos actualizado correctamente",
        "success"
      );
    }
  };

  const handleChange = (event: any) => {
    setInput({ ...input, [event.target.name]: event.target.value });
    setErrors(
      validateHospitalForm({
        ...input,
        [event.target.name]: event.target.value,
      })
    );

    const newErrors = validateHospitalForm({
      ...input,
      [event.target.name]: event.target.value,
    });
    const hasErrors = Object.keys(newErrors).length > 0;
    setDisabled(hasErrors);
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nombre:</label>
        <input
          type="text"
          name="nombre"
          value={input.nombre}
          onChange={handleChange}
        />
        {errors.nombre && <p>{errors.nombre}</p>}
      </div>
      <div>
        <label>Número de Casos de Covid del Último Mes:</label>
        <input
          type="number"
          name="numeroCasosCovidUltimoMes"
          value={input.numeroCasosCovidUltimoMes}
          onChange={handleChange}
        />
        {errors.numeroCasosCovidUltimoMes && (
          <p>{errors.numeroCasosCovidUltimoMes}</p>
        )}
      </div>
      <button type="submit" disabled={disabled}>
        Crear
      </button>
    </form>
  );
};

export default HospitalForm;
