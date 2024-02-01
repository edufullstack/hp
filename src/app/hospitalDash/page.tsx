"use client";

import storageData from "@/utils/storage";
import styles from "../page.module.css";
import React, { useEffect, useState } from "react";
import { getPedidosHospital } from "@/services/hospitalDash.services";
import PedidosCard from "@/components/PedidosCard";
import CasosCovid from "../../components/CasosCovidCard";
import InsumosCard from "@/components/InsumosCard";
import Button from "@/components/Button/Button";
import Image from "next/image";
import { useRouter } from "next/navigation";

const HospitalDashboard = ({ hospitalName }: any) => {
	const [hospital, setHospital] = useState<any>({});
	const [pedidos, setPedidos] = useState<any>([]);
	const [insumos, setInsumos] = useState<boolean>(true);
	const [actualizar, setActualizar] = useState(0);
	const [mostrarPendientes, setMostrarPendientes] = useState(false);
	const router = useRouter();
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
			<div className="subtitle_back">
				<Button type="icon" onClick={() => router.back()}>
					<Image alt="back" width={20} height={20} src="./back.svg" />
				</Button>
				<h1>Panel del Hospital: {hospital.nombre}</h1>
			</div>

			<section>
				<Button
					type={mostrarPendientes ? "secondary" : ""}
					onClick={() => setMostrarPendientes(!mostrarPendientes)}>
					{mostrarPendientes ? "Ocultar Pedidos" : "Mostrar Pedidos"}
				</Button>
				<h2>Pedidos </h2>
				{mostrarPendientes && (
					<div className="section">
						<div className="table_header table_row_pedidos  ">
							<p>
								<strong>Estado del Pedido</strong>
							</p>
							<p>
								<strong>Cantidad de Insumos:</strong>
							</p>
							<p>
								<strong>Nombre del Insumo</strong>
							</p>
						</div>
						{pedidos.map((item: any, index: number) => (
							<PedidosCard
								key={index}
								status={item.asignado}
								cantidad={item.cantidadAsignada}
								nombreInsumo={item.tipo}
							/>
						))}
					</div>
				)}
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

			<InsumosCard setInsumos={setInsumos} hospital={hospital} />
		</div>
	);
};

export default HospitalDashboard;
