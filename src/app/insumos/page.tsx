"use client";
import Button from "@/components/Button/Button";
import InsumoForm from "@/components/InsumoForm";
import InsumosComponent from "@/components/InsumosOrgCard";
import {
	getHospitales,
	getInsumos,
	removeInsumo,
} from "@/services/organizacionDash.services";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "../page.module.css";
import { useRouter } from "next/navigation";
import "./insumos.css";
export default function Insumos() {
	const [showInsumos, setShowInsumos] = useState(false);
	const [showCrear, setShowCrear] = useState(false);
	const [actualizar, setActualizar] = useState(0);
	const [insumos, setInsumos] = useState([]);
	const [hospitales, setHospitales] = useState([]);
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

	return (
		<main className={styles.main}>
			<div className="insumos">
				<h2>Pagina principal insumos</h2>
				<div className="options">
					<Button onClick={() => router.push("/asignaciones")}>
						Asignar insumos
					</Button>

					<Button onClick={handleShowCrearInsumo}>Crear insumo</Button>

					{showCrear ? (
						<InsumoForm
							onActualizar={() => {
								setActualizar((prev) => prev + 1);
							}}
						/>
					) : null}
					{showInsumos
						? insumos
								.filter((item: any) => !item.borrado)
								.map((item: any, index: number) => (
									<InsumosComponent
										key={index}
										item={item}
										onBorrar={() => handleBorrarInsumo(item.insumoId)}
									/>
								))
						: null}
				</div>
			</div>
		</main>
	);
}
