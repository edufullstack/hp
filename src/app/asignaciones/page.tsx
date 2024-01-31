"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  getAsignaciones,
  removeAsignacion,
  updateAsignacion,
} from "@/services/organizacionDash.services";

const Asignaciones = () => {
  const [asignaciones, setAsignaciones] = useState([]);
  const [asignacionSeleccionada, setAsignacionSeleccionada] =
    useState<any>(null);
  const [showForm, setShowForm] = useState(false);
  const [terminoBusqueda, setTerminoBusqueda] = useState("");
  const [sortType, setSortType] = useState("");
  const [asignacionesFiltradas, setAsignacionesFiltradas] = useState([]);
  const [actualizar, setActualizar] = useState(0);

  useEffect(() => {
    const obtenerAsignacionesPendientes = async () => {
      const data = await getAsignaciones();
      setAsignaciones(data);
      setAsignacionesFiltradas(data);
    };
    obtenerAsignacionesPendientes();
  }, [actualizar]);

  const aplicarFiltrosYOrdenamiento = () => {
    let resultado = asignaciones.filter(
      (asignacion: any) =>
        asignacion.nombreHospital
          .toLowerCase()
          .includes(terminoBusqueda.toLowerCase()) ||
        asignacion.nombreInsumo
          .toLowerCase()
          .includes(terminoBusqueda.toLowerCase())
    );

    if (sortType === "menor-casos-covid") {
      resultado.sort((a: any, b: any) => b.casosCovid - a.casosCovid);
    } else if (sortType === "mayor-casos-covid") {
      resultado.sort((a: any, b: any) => a.casosCovid - b.casosCovid);
    }

    setAsignacionesFiltradas(resultado);
  };

  const handleSeleccionarAsignacion = (asignacion: any) => {
    setAsignacionSeleccionada(asignacion);
  };

  const handleBusqueda = () => {
    aplicarFiltrosYOrdenamiento();
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
      await updateAsignacion({
        asignacionId,
        cantidadDisponible,
        cantidadAsignada,
        insumoId,
      });
      const data = await getAsignaciones();
      setAsignaciones(data);

      setShowForm(false);
      setAsignacionSeleccionada(null);
    } catch (error) {
      console.error("Error al actualizar la asignación:", error);
    }
  };

  const handleOrder = (event: any) => {
    setSortType(event.target.value);
    aplicarFiltrosYOrdenamiento();
  };

  const handleBorrarAsignacion = async (id: number) => {
    const eliminado = await removeAsignacion(id);
    alert(eliminado);
    setActualizar(actualizar + 1);
  };

  return (
    <div>
      <h2>Asignacion de insumos</h2>
      <Link href="/organizacionDash">
        <button>Regresar</button>
      </Link>
      <button onClick={handleMostrarFormulario}>Asignar</button>
      <select onChange={handleOrder}>
        <option value="">Seleccione para ordenar</option>
        <option value="mayor-casos-covid">Mayor casos covid</option>
        <option value="menor-casos-covid">Menor casos covid</option>
      </select>
      <input
        type="text"
        value={terminoBusqueda}
        onChange={(e) => setTerminoBusqueda(e.target.value)}
      />
      <button onClick={handleBusqueda}>Buscar</button>

      {asignacionesFiltradas.map((asignacion: any) =>
        !asignacion.borrado ? (
          <div key={asignacion.asignacionId}>
            <div>
              <p>Hospital: {asignacion.nombreHospital}</p>
              <p>Numero de casos covid: {asignacion.casosCovid}</p>
              <p>Insumo: {asignacion.nombreInsumo}</p>
              <p>Cantidad disponible: {asignacion.cantidadDisponible}</p>
              <p>Cantidad solicitada: {asignacion.cantidadAsignada}</p>
              <p>Asignado: {asignacion.asignado ? "Si" : "No"}</p>
              {!asignacion.asignado ? (
                <button
                  onClick={() =>
                    handleBorrarAsignacion(asignacion.asignacionId)
                  }
                >
                  Borrar
                </button>
              ) : null}
            </div>
            {!asignacion.asignado ? (
              <input
                type="radio"
                name="asignacionSeleccionada"
                onChange={() => handleSeleccionarAsignacion(asignacion)}
              />
            ) : null}
          </div>
        ) : null
      )}

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
