"use client";
import { getInsumos, saveAsignacion } from "@/services/hospitalDash.services";
import { useEffect, useState } from "react";

const InsumosCard = ({
  setInsumos,
  hospital,
}: {
  setInsumos: any;
  hospital: any;
}) => {
  const [nombreInsumo, setNombreInsumo] = useState([]);
  const [insumoSeleccionado, setInsumoSeleccionado] = useState("");
  const [cantidad, setCantidad] = useState("");

  useEffect(() => {
    const fetchInsumos = async () => {
      const nombre = await getInsumos();
      setNombreInsumo(nombre);
    };
    fetchInsumos();
  }, []);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    // Aquí puedes manejar el envío del formulario, por ejemplo, enviar los datos a una API
    const fechaActual = new Date();
    const data = {
      hospitalId: hospital.hospitalId.toString(),
      insumoId: insumoSeleccionado.toString(),
      cantidadAsignada: cantidad.toString(),
      fechaAsignacion: fechaActual.toString(),
    };
    await saveAsignacion(data);
    setInsumos(true);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Solicitud de Insumos</h2>

      <div>
        <label htmlFor="nombreInsumo">Seleccionar insumo:</label>
        <select
          id="nombreInsumo"
          value={insumoSeleccionado}
          onChange={(e) => setInsumoSeleccionado(e.target.value)}
        >
          <option value="">-- Selecciona un insumo --</option>
          {nombreInsumo.map((nombre: any) => (
            <option key={nombre.insumoId} value={nombre.insumoId}>
              {nombre.tipo}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="cantidad">Cantidad:</label>
        <input
          type="number"
          id="cantidad"
          value={cantidad}
          onChange={(e) => setCantidad(e.target.value)}
        />
      </div>

      <button type="submit">Solicitar Insumos</button>
    </form>
  );
};

export default InsumosCard;
