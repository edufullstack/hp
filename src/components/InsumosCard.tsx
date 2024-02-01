"use client";
import { getInsumos, saveAsignacion } from "@/services/hospitalDash.services";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

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
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  useEffect(() => {
    const fetchInsumos = async () => {
      const nombre = await getInsumos();
      setNombreInsumo(nombre);
    };
    fetchInsumos();
  }, []);

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const fechaActual = new Date();
    const data = {
      hospitalId: hospital.hospitalId.toString(),
      insumoId: insumoSeleccionado.toString(),
      cantidadAsignada: cantidad.toString(),
      fechaAsignacion: fechaActual.toString(),
    };
    let saved = await saveAsignacion(data);
    setInsumos(true);
    if (saved.error) {
      Swal.fire(
        "Error",
        "Error al solicitar insumos, inténtalo de nuevo",
        "error"
      );
      return;
    }
    setCantidad("");
    setInsumoSeleccionado("");
    setMostrarFormulario(false);
    Swal.fire("Éxito", "Insumos solicitados correctamente", "success");
  };

  const toggleFormulario = () => {
    setMostrarFormulario(!mostrarFormulario);
  };

  return (
    <div>
      <h2>Solicitar Insumos</h2>

      <button onClick={toggleFormulario}>
        {mostrarFormulario ? <p>Cancelar</p> : <p>Solicitar Insumos</p>}
      </button>

      {mostrarFormulario && (
        <form onSubmit={handleSubmit}>
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

          <button type="submit">Enviar Solicitud</button>
        </form>
      )}
    </div>
  );
};

export default InsumosCard;
