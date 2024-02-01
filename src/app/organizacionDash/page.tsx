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
import Button from "@/components/Button/Button";
import { useRouter } from "next/navigation";

const OrganizationDashboard = ({ hospitalName }: any) => {
	const [actualizar, setActualizar] = useState(0);
	const [insumos, setInsumos] = useState([]);
	const [hospitales, setHospitales] = useState([]);
	const [showHospitales, setShowHospitales] = useState(false);
	const [showCrearHospital, setShowCrearHospital] = useState(false);

	const router = useRouter();
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
			<div className="options">
				<div className="insumos">
					<Button type="secondary" onClick={() => router.push("/insumos")}>
						Insumos
					</Button>
				</div>
				<div className="hospitals">
					<Button type="secondary" onClick={handleHospital}>
						Hospitales
					</Button>
					{showHospitales ? (
						<Button onClick={handleShowCrearHospital}>Crear hospital</Button>
					) : null}
					{showCrearHospital ? (
						<HospitalForm
							onActualizar={() => {
								setActualizar((prev) => prev + 1);
							}}
						/>
					) : null}
					{showHospitales ? (
						<>
							<div className="table_header table_row_hospitales">
								<p>
									<strong>Nombre</strong>
								</p>
								<p>
									<strong>Numero casos covid último mes</strong>
								</p>

								<p>
									<strong>Borrar</strong>
								</p>
							</div>
							{hospitales
								.filter((item: any) => !item.borrado)
								.map((hospital: any, index: number) => {
									return (
										<HospitalCard
											key={index}
											item={hospital}
											onEliminar={() => handleBorrarInsumo(hospital.hospitalId)}
										/>
									);
								})}
						</>
					) : null}
				</div>

				<Button type="secondary" onClick={() => router.push("/entregas")}>
					Entregados
				</Button>
			</div>
		</div>
	);
};

export default OrganizationDashboard;
