"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  getAsignaciones,
  getEntregas,
  saveEntregas,
  // actualizarAsignacion,
} from "@/services/organizacionDash.services";

const Entregas = () => {
  const [asignaciones, setAsignaciones] = useState([]);
  const [asignacionSeleccionada, setAsignacionSeleccionada] =
    useState<any>(null);
  const [entregas, setEntregas] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [terminoBusqueda, setTerminoBusqueda] = useState("");
  const [asignacionesFiltradas, setAsignacionesFiltradas] = useState([]);
  const [entregasFiltradas, setEntregasFiltradas] = useState([]);
  const [actualizar, setActualizar] = useState(0);

  useEffect(() => {
    const obtenerAsignaciones = async () => {
      const dataAsignaciones = await getAsignaciones();
      setAsignaciones(dataAsignaciones);
      setAsignacionesFiltradas(dataAsignaciones);
    };
    const obtenerEntregas = async () => {
      const entregasData = await getEntregas();
      setEntregas(entregasData);
      setEntregasFiltradas(entregasData);
    };
    obtenerEntregas();
    obtenerAsignaciones();
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

  const handleActualizarEntrega = async ({
    asignacionId,
    hospitalId,
    insumoId,
    cantidadAsignada,
    cantidadTotalEnBodega,
  }: {
    asignacionId: number;
    hospitalId: number;
    insumoId: number;
    cantidadAsignada: number;
    cantidadTotalEnBodega: number;
  }) => {
    let cantidadActualizarBodega = cantidadTotalEnBodega - cantidadAsignada;
    await saveEntregas({
      asignacionId,
      hospitalId,
      insumoId,
      cantidadAsignada,
      cantidadActualizarBodega,
    });
    setActualizar(actualizar + 1);
  };

  const handleSearch = () => {
    const filteredAsignaciones = asignaciones.filter(
      (asignacion: any) =>
        asignacion.nombreHospital
          .toLowerCase()
          .includes(terminoBusqueda.toLowerCase()) ||
        asignacion.nombreInsumo
          .toLowerCase()
          .includes(terminoBusqueda.toLowerCase())
    );

    const filteredEntregas = entregas.filter(
      (entrega: any) =>
        entrega.nombreHospital
          .toLowerCase()
          .includes(terminoBusqueda.toLowerCase()) ||
        entrega.nombreInsumo
          .toLowerCase()
          .includes(terminoBusqueda.toLowerCase())
    );

    setAsignacionesFiltradas(filteredAsignaciones);
    setEntregasFiltradas(filteredEntregas);
  };

  return (
    <div>
      <h2>Entregas</h2>
      <Link href="/organizacionDash">
        <button>Regresar</button>
      </Link>
      <button onClick={handleMostrarFormulario}>Entregar</button>

      <input
        type="text"
        value={terminoBusqueda}
        onChange={(event) => setTerminoBusqueda(event.target.value)}
      />
      <button onClick={handleSearch}>Buscar</button>

      {asignacionesFiltradas
        .filter((asignacion: any) => asignacion.asignado && !asignacion.borrado)
        .map((asignacion: any) => (
          <div key={asignacion.asignacionId}>
            <p>Hospital: {asignacion.nombreHospital}</p>
            <p>Numero de casos covid: {asignacion.casosCovid}</p>
            <p>Insumo: {asignacion.nombreInsumo}</p>
            <p>Cantidad en bodega: {asignacion.cantidadTotalEnBodega}</p>
            <p>Cantidad asignada: {asignacion.cantidadAsignada}</p>
            <p>Asignado: {asignacion.asignado ? "Si" : "No"}</p>

            <input
              type="radio"
              name="asignacionSeleccionada"
              onChange={() => handleSeleccionarAsignacion(asignacion)}
            />
          </div>
        ))}

      {showForm && (
        <div>
          <h1>Formulario de entregas</h1>
          <p>Hospital: {asignacionSeleccionada.nombreHospital}</p>
          <p>Numero de casos covid: {asignacionSeleccionada.casosCovid}</p>
          <p>Insumo: {asignacionSeleccionada.nombreInsumo}</p>
          <p>
            Cantidad en bodega: {asignacionSeleccionada.cantidadTotalEnBodega}
          </p>
          <p>Cantidad asignada: {asignacionSeleccionada.cantidadAsignada}</p>
          <p>Asignado: {asignacionSeleccionada.asignado ? "Si" : "No"}</p>
          <button
            onClick={() =>
              handleActualizarEntrega({
                asignacionId: asignacionSeleccionada.asignacionId,
                hospitalId: asignacionSeleccionada.hospitalId,
                insumoId: asignacionSeleccionada.insumoId,
                cantidadAsignada: asignacionSeleccionada.cantidadAsignada,
                cantidadTotalEnBodega:
                  asignacionSeleccionada.cantidadTotalEnBodega,
              })
            }
          >
            Enviar
          </button>
        </div>
      )}
      <h2>Entregas</h2>
      {entregasFiltradas.length > 0 ? (
        entregasFiltradas.map((entrega: any) =>
          entrega.entregaId ? (
            <div key={entrega.entregaId}>
              <p>Hospital: {entrega.nombreHospital}</p>
              <p>Numero de casos covid: {entrega.casosCovid}</p>
              <p>Insumo: {entrega.nombreInsumo}</p>
              <p>Cantidad entregada: {entrega.cantidadEntregada}</p>
              <p>Fecha entrega: {entrega.fechaEntrega.slice(0, 10)}</p>
            </div>
          ) : null
        )
      ) : (
        <p>No hay entregas para mostrar</p>
      )}
    </div>
  );
};

export default Entregas;
