import { saveInsumo } from "@/services/organizacionDash.services";
import React, { useState } from "react";

const InsumoForm = ({ onActualizar }: { onActualizar: any }) => {
  // Estados para cada campo del formulario
  const [tipo, setTipo] = useState("");
  const [cantidadTotalEnBodega, setCantidadTotalEnBodega] = useState("");
  const [cantidadDisponible, setCantidadDisponible] = useState("");

  const handleSubmit = (event: any) => {
    event.preventDefault();

    const nuevoInsumo = {
      tipo,
      cantidadTotalEnBodega: cantidadTotalEnBodega,
      cantidadDisponible: cantidadDisponible,
    };
    saveInsumo(nuevoInsumo);
    setTipo("");
    setCantidadTotalEnBodega("");
    setCantidadDisponible("");
    onActualizar();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Tipo:</label>
        <input
          type="text"
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
        />
      </div>
      <div>
        <label>Cantidad Total en Bodega:</label>
        <input
          type="number"
          value={cantidadTotalEnBodega}
          onChange={(e) => setCantidadTotalEnBodega(e.target.value)}
        />
      </div>
      <div>
        <label>Cantidad Disponible:</label>
        <input
          type="number"
          value={cantidadDisponible}
          onChange={(e) => setCantidadDisponible(e.target.value)}
        />
      </div>
      <button type="submit">Crear </button>
    </form>
  );
};

export default InsumoForm;
