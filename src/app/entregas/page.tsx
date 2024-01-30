"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  getAsignaciones,
  getEntregas,
  // actualizarAsignacion,
} from "@/services/organizacionDash.services";

const Entregas = () => {
  const [asignaciones, setAsignaciones] = useState([]);
  const [asignacionSeleccionada, setAsignacionSeleccionada] =
    useState<any>(null);
  const [entregas, setEntregas] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const obtenerAsignaciones = async () => {
      const data = await getAsignaciones();
      setAsignaciones(data);
    };
    const obtenerEntregas = async () => {
      const entregasData = await getEntregas();
      setEntregas(entregasData);
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
  const handleActualizarEntrega = (asignacion: any) => {
    console.log(entregas);
  };

  return (
    <div>
      <Link href="/organizacionDash">
        <button>Regresar</button>
      </Link>
      <button onClick={handleMostrarFormulario}>Asignar</button>

      <select>
        <option>Seleccione para ordenar</option>
        <option>Mayor casos covid</option>
        <option>Menor casos covid</option>
      </select>
      <h2>Asignaciones</h2>

      {asignaciones
        .filter((asignacion: any) => asignacion.asignado)
        .map((asignacion: any) => (
          <div key={asignacion.asignacionId}>
            <p>Hospital: {asignacion.nombreHospital}</p>
            <p>Numero de casos covid: {asignacion.casosCovid}</p>
            <p>Insumo: {asignacion.nombreInsumo}</p>
            <p>Cantidad: {asignacion.cantidadAsignada}</p>
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
          <h1>Formulario de Asignación</h1>
          <p>Hospital: {asignacionSeleccionada.nombreHospital}</p>
          <p>Numero de casos covid: {asignacionSeleccionada.casosCovid}</p>
          <p>Insumo: {asignacionSeleccionada.nombreInsumo}</p>
          <p>Cantidad: {asignacionSeleccionada.cantidadAsignada}</p>
          <p>Asignado: {asignacionSeleccionada.asignado ? "Si" : "No"}</p>
          <button
            onClick={() =>
              handleActualizarEntrega(asignacionSeleccionada.asignacionId)
            }
          >
            Enviar
          </button>
        </div>
      )}
      <h2>Entregas</h2>
      {entregas.length > 0 ? (
        entregas.map((entrega: any) =>
          entrega.entregaId ? (
            <div key={entrega.entregaId}>
              <p>Hospital: {entrega.nombreHospital}</p>
              <p>Numero de casos covid: {entrega.casosCovid}</p>
              <p>Insumo: {entrega.nombreInsumo}</p>
              <p>Cantidad: {entrega.cantidadAsignada}</p>
              <p>Entregado: {entrega.fechaEntrega ? "Si" : "No"}</p>
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
