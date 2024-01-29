"use client";

import styles from "../page.module.css";
import React, { useState } from "react";
const HospitalDashboard = ({ hospitalName }: any) => {
  const [pedidosPendientes, setPedidosPendientes] = useState([]); // Aquí deberías cargar los pedidos pendientes
  const [pedidosRealizados, setPedidosRealizados] = useState([]); // Aquí deberías cargar los pedidos realizados

  const registrarCasoCovid = () => {
    // Lógica para registrar un caso de COVID
  };

  const solicitarInsumos = () => {
    // Lógica para solicitar insumos
  };

  return (
    <div>
      <h1>Panel del Hospital: {hospitalName}</h1>

      <section>
        <h2>Pedidos Pendientes</h2>
        {/* Renderizar lista de pedidos pendientes aquí */}
      </section>

      <section>
        <h2>Pedidos Realizados</h2>
        {/* Renderizar lista de pedidos realizados aquí */}
      </section>

      <section>
        <h2>Registrar Casos de COVID</h2>
        <button onClick={registrarCasoCovid}>Registrar Caso</button>
      </section>

      <section>
        <h2>Solicitar Insumos</h2>
        <button onClick={solicitarInsumos}>Solicitar Insumos</button>
      </section>
    </div>
  );
};

export default HospitalDashboard;
