"use client";

import {
  getHospitales,
  getInsumos,
  removeInsumo,
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

  const handleInsumo = () => {
    setShowInsumos(!showInsumos);
  };

  const handleShowCrearInsumo = () => {
    setShowCrear(!showCrear);
  };

  const handleBorrarInsumo = async (insumoId: number) => {
    const eliminado = await removeInsumo(insumoId);
    alert(eliminado);
    setActualizar(actualizar + 1);
  };

  const handleHospital = () => {
    setShowHospitales(!showHospitales);
  };
  const handleShowCrearHospital = () => {
    setShowCrearHospital(!showCrearHospital);
  };

  return (
    <div>
      <h1>Dashboard de la Organización</h1>

      <button onClick={handleInsumo}>Insumos</button>

      {showInsumos ? (
        <button onClick={handleShowCrearInsumo}>Crear insumo</button>
      ) : null}
      {showInsumos ? (
        <>
          {showCrear && (
            <InsumoForm
              onActualizar={() => {
                setActualizar((prev) => prev + 1);
              }}
            />
          )}
          {insumos.filter((item: any) => !item.borrado).length > 0 ? (
            insumos
              .filter((item: any) => !item.borrado)
              .map((item: any, index: number) => (
                <InsumosComponent
                  key={index}
                  item={item}
                  onBorrar={() => handleBorrarInsumo(item.insumoId)}
                />
              ))
          ) : (
            <p>No existen insumos</p>
          )}
        </>
      ) : null}

      <button onClick={handleHospital}>Hospitales</button>
      {showHospitales ? (
        <button onClick={handleShowCrearHospital}>Crear hospital</button>
      ) : null}
      {showHospitales ? (
        <>
          {showCrearHospital && (
            <HospitalForm
              onActualizar={() => {
                setActualizar((prev) => prev + 1);
              }}
            />
          )}
          {hospitales.filter((item: any) => !item.borrado).length > 0 ? (
            hospitales
              .filter((item: any) => !item.borrado)
              .map((hospital: any, index: number) => (
                <HospitalCard
                  key={index}
                  item={hospital}
                  onEliminar={() => handleBorrarInsumo(hospital.hospitalId)}
                />
              ))
          ) : (
            <p>No existen hospitales</p>
          )}
        </>
      ) : null}

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
