"use client";

import {
  getHospitales,
  getInsumos,
} from "@/services/organizacionDash.services";
import styles from "../page.module.css";
import { useEffect, useState } from "react";
import InsumosComponent from "@/components/InsumosOrgCard";
import InsumoForm from "@/components/InsumoForm";
import HospitalForm from "@/components/HospitalForm";
import HospitalCard from "@/components/HospitalCard";
import Link from "next/link";

const OrganizationDashboard = ({ hospitalName }: any) => {
  const [actualizar, setActualizar] = useState(0);
  const [insumos, setInsumos] = useState([]);
  const [showInsumos, setShowInsumos] = useState(false);
  const [showCrear, setShowCrear] = useState(false);
  const [hospitales, setHospitales] = useState([]);
  const [showHospitales, setShowHospitales] = useState(false);
  const [showCrearHospital, setShowCrearHospital] = useState(false);
  const [entregas, setEntregas] = useState([]);
  const [showEntregas, setShowEntregas] = useState(false);

  useEffect(() => {
    const fetchInsumos = async () => {
      const data = await getInsumos();
      setInsumos(data);
    };
    const fetchHospital = async () => {
      const hospitalData = await getHospitales();
      setHospitales(hospitalData);
    };
    fetchInsumos();
    fetchHospital();
  }, [actualizar]);

  const [busqueda, setBusqueda] = useState("");
  // Otras variables de estado que puedas necesitar

  const handleInsumo = () => {
    setShowInsumos(!showInsumos);
  };
  const handleShowCrearInsumo = () => {
    setShowCrear(!showCrear);
  };

  const handleHospital = () => {
    setShowHospitales(!showHospitales);
  };
  const handleShowCrearHospital = () => {
    setShowCrearHospital(!showCrearHospital);
  };

  const handleCrearEntrega = () => {
    // Lógica para crear entrega
  };

  const handleEliminar = (tipo: any, id: number) => {
    // Lógica para eliminar insumo/hospital/entrega
  };

  return (
    <div>
      <h1>Dashboard de la Organización</h1>

      {/* Sección para crear insumos, hospitales y entregas */}
      <button onClick={handleInsumo}>Insumos</button>

      {showInsumos ? (
        <button onClick={handleShowCrearInsumo}>Crear insumo</button>
      ) : null}
      {showCrear ? (
        <InsumoForm
          onActualizar={() => {
            setActualizar((prev) => prev + 1);
          }}
        />
      ) : null}
      {showInsumos
        ? insumos.map((item: any, index: number) => {
            return <InsumosComponent key={index} item={item} />;
          })
        : null}

      <button onClick={handleHospital}>Hospitales</button>
      {showHospitales ? (
        <button onClick={handleShowCrearHospital}>Crear hospital</button>
      ) : null}
      {showCrearHospital ? (
        <HospitalForm
          onActualizar={() => {
            setActualizar((prev) => prev + 1);
          }}
        />
      ) : null}
      {showHospitales
        ? hospitales.map((hospital: any, index: number) => {
            return <HospitalCard key={index} item={hospital} />;
          })
        : null}

      <Link href={"/asignaciones"}>
        <button>Asignar insumos</button>
      </Link>

      <Link href={"/entregas"}>
        <button>Entregados</button>
      </Link>
    </div>
  );
};

export default OrganizationDashboard;
