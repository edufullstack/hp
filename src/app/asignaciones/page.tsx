"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  getAsignaciones,
  updateAsignacion,
} from "@/services/organizacionDash.services";

const Asignaciones = () => {
  const [asignaciones, setAsignaciones] = useState([]);
  const [asignacionSeleccionada, setAsignacionSeleccionada] =
    useState<any>(null);
  const [showForm, setShowForm] = useState(false);

  // Suponiendo que tienes una función para obtener las asignaciones pendientes
  useEffect(() => {
    const obtenerAsignacionesPendientes = async () => {
      const data = await getAsignaciones();
      setAsignaciones(data);
    };

    obtenerAsignacionesPendientes();
  }, []);
  const handleSeleccionarAsignacion = (asignacion: any) => {
    setAsignacionSeleccionada(asignacion);
  };

  const handleMostrarFormulario = () => {
    if (asignacionSeleccionada) {
      setShowForm(true);
    } else {
      alert("Por favor, seleccione una asignación.");
    }
  };

  const handleActualizarAsignacion = async ({
    asignacionId,
    cantidadDisponible,
    cantidadAsignada,
    insumoId,
  }: {
    asignacionId: number;
    cantidadDisponible: number;
    cantidadAsignada: number;
    insumoId: number;
  }) => {
    try {
      console.log(insumoId);
      await updateAsignacion({
        asignacionId,
        cantidadDisponible,
        cantidadAsignada,
        insumoId,
      });
      // Aquí vuelves a obtener las asignaciones
      const data = await getAsignaciones();
      setAsignaciones(data);

      // Opcional: ocultar el formulario y limpiar la selección
      setShowForm(false);
      setAsignacionSeleccionada(null);
    } catch (error) {
      console.error("Error al actualizar la asignación:", error);
    }
  };

  return (
    <div>
      <h2>Asignacion de insumos</h2>
      <Link href="/organizacionDash">
        <button>Regresar</button>
      </Link>
      <button onClick={handleMostrarFormulario}>Asignar</button>
      {asignaciones.map((asignacion: any) => (
        <div key={asignacion.asignacionId}>
          <div key={asignacion.asignacionId}>
            <p>Hospital: {asignacion.nombreHospital}</p>
            <p>Numero de casos covid: {asignacion.casosCovid}</p>
            <p>Insumo: {asignacion.nombreInsumo}</p>
            <p>Cantidad disponible: {asignacion.cantidadDisponible}</p>
            <p>Cantidad solicitada: {asignacion.cantidadAsignada}</p>
            <p>Asignado: {asignacion.asignado ? "Si" : "No"}</p>
          </div>
          {!asignacion.asignado ? (
            <input
              type="radio"
              name="asignacionSeleccionada"
              onChange={() => handleSeleccionarAsignacion(asignacion)}
            />
          ) : null}
        </div>
      ))}
      {showForm && (
        <div>
          <h1>Formulario de Asignación</h1>
          <p>Hospital: {asignacionSeleccionada.nombreHospital}</p>
          <p>Numero de casos covid: {asignacionSeleccionada.casosCovid}</p>
          <p>Insumo: {asignacionSeleccionada.nombreInsumo}</p>
          <p>
            Cantidad disponible: {asignacionSeleccionada.cantidadDisponible}
          </p>
          <p>Cantidad solicitada: {asignacionSeleccionada.cantidadAsignada}</p>
          <p>Asignado: {asignacionSeleccionada.asignado ? "Si" : "No"}</p>
          <button
            onClick={() =>
              handleActualizarAsignacion({
                asignacionId: asignacionSeleccionada.asignacionId,
                cantidadDisponible: asignacionSeleccionada.cantidadDisponible,
                cantidadAsignada: asignacionSeleccionada.cantidadAsignada,
                insumoId: asignacionSeleccionada.insumoId,
              })
            }
          >
            Enviar
          </button>
        </div>
      )}
    </div>
  );
};

export default Asignaciones;
