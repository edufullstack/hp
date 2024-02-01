"use client";

import storageData from "@/utils/storage";
import styles from "../page.module.css";
import React, { useEffect, useState } from "react";
import { getPedidosHospital } from "@/services/hospitalDash.services";
import PedidosCard from "@/components/PedidosCard";
import CasosCovid from "../../components/CasosCovidCard";
import InsumosCard from "@/components/InsumosCard";

const HospitalDashboard = ({ hospitalName }: any) => {
  const [hospital, setHospital] = useState<any>({});
  const [pedidos, setPedidos] = useState<any>([]);
  const [insumos, setInsumos] = useState<boolean>(true);
  const [actualizar, setActualizar] = useState(0);
  const [mostrarPendientes, setMostrarPendientes] = useState(false);
  // const [mostrarEntregados, setMostrarEntregados] = useState(false);
  // const pedidosPendientes = pedidos.filter((item: any) => !item.entregado);
  // const pedidosEntregados = pedidos.filter((item: any) => item.entregado);

  const solicitarInsumos = () => {
    setInsumos(false);
  };

  useEffect(() => {
    const fetchPedidos = async () => {
      const hospitalData = storageData.getData("user");
      if (hospitalData) {
        setHospital(hospitalData[0]);
        try {
          const pedidosData = await getPedidosHospital(
            hospitalData[0].hospitalId
          );
          setPedidos(pedidosData);
        } catch (error) {
          console.error("Error al obtener los pedidos:", error);
        }
      }
    };
    fetchPedidos();
  }, [insumos, actualizar]);

  return (
    <div>
      <h1>Panel del Hospital: {hospital.nombre}</h1>
      <section>
        <button onClick={() => setMostrarPendientes(!mostrarPendientes)}>
          {mostrarPendientes ? "Ocultar Pedidos" : "Mostrar Pedidos"}
        </button>
        <h2>Pedidos </h2>
        {mostrarPendientes &&
          pedidos.map((item: any, index: number) => (
            <PedidosCard
              key={index}
              status={item.asignado}
              cantidad={item.cantidadAsignada}
              nombreInsumo={item.tipo}
            />
          ))}
      </section>

      <section>
        <CasosCovid
          casos={hospital.numeroCasosCovidUltimoMes}
          hospitalId={hospital.hospitalId}
          onActualizar={() => {
            setActualizar((prev) => prev + 1);
          }}
        />
      </section>

      {insumos ? (
        <section>
          <h2>Solicitar Insumos</h2>
          <button onClick={solicitarInsumos}>Solicitar Insumos</button>
        </section>
      ) : (
        <InsumosCard setInsumos={setInsumos} hospital={hospital} />
      )}
    </div>
  );
};

export default HospitalDashboard;
