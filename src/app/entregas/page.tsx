"use client";
import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
	getAsignaciones,
	getEntregas,
	saveEntregas,
	// actualizarAsignacion,
} from "@/services/organizacionDash.services";
import Swal from "sweetalert2";
import Button from "@/components/Button/Button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import InputText from "@/components/Input/Input";
import "./entregas.css";
const Entregas = () => {
	const [asignaciones, setAsignaciones] = useState([]);
	const [asignacionSeleccionada, setAsignacionSeleccionada] =
		useState<any>(null);
	const [entregas, setEntregas] = useState([]);
	const [terminoBusqueda, setTerminoBusqueda] = useState("");
	const [asignacionesFiltradas, setAsignacionesFiltradas] = useState([]);
	const [entregasFiltradas, setEntregasFiltradas] = useState([]);
	const [actualizar, setActualizar] = useState(0);
	const router = useRouter();

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
	}, [actualizar]);

	const hasPendingEntregas = useMemo(() => {
		console.log("entregasFiltradas", asignaciones);
		let flag = false;
		asignaciones.map((asignacion: any) => {
			console.log("asignacion", asignacion.borrado);
			if (!asignacion.borrado) flag = true;
		});
		return flag;
	}, [entregasFiltradas]);
	const handleSeleccionarAsignacion = (asignacion: any) => {
		setAsignacionSeleccionada(asignacion);
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
		const result = await Swal.fire({
			title: "¿Estás seguro?",
			text: "Estás por actualizar la entrega",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Sí, actualizar",
			cancelButtonText: "Cancelar",
		});

		// Procede solo si el usuario confirma
		if (result.isConfirmed) {
			let cantidadActualizarBodega = cantidadTotalEnBodega - cantidadAsignada;

			try {
				let response = await saveEntregas({
					asignacionId,
					hospitalId,
					insumoId,
					cantidadAsignada,
					cantidadActualizarBodega,
				});

				if (response.error) {
					await Swal.fire({
						icon: "error",
						title: "Error",
						text: "No se pudo actualizar la entrega, inténtalo de nuevo",
					});
					return;
				}

				await Swal.fire({
					icon: "success",
					title: "Éxito",
					text: "La entrega ha sido actualizada correctamente",
				});

				setActualizar(actualizar + 1);
			} catch (error) {
				console.error("Error al actualizar la entrega:", error);
				await Swal.fire({
					icon: "error",
					title: "Error",
					text: "No se pudo actualizar la entrega, inténtalo de nuevo",
				});
			}
		}
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
			<div className="subtitle_back">
				<Button type="icon" onClick={() => router.push("/organizacionDash")}>
					<Image alt="back" width={20} height={20} src="./back.svg" />
				</Button>
				<h2 className="subtitle">Entregas</h2>
			</div>
			<div className="header_entregas">
				<Button
					type="secondary"
					onClick={() => {
						if (!asignacionSeleccionada) {
							Swal.fire({
								icon: "warning",
								title: "Atención",
								text: "Por favor, seleccione una asignación primero.",
							});
							asignaciones;
						} else {
							handleActualizarEntrega({
								asignacionId: asignacionSeleccionada.asignacionId,
								hospitalId: asignacionSeleccionada.hospitalId,
								insumoId: asignacionSeleccionada.insumoId,
								cantidadAsignada: asignacionSeleccionada.cantidadAsignada,
								cantidadTotalEnBodega:
									asignacionSeleccionada.cantidadTotalEnBodega,
							});
						}
					}}>
					Entregar
				</Button>
				<div className="search">
					<InputText
						id="terminoBusqueda"
						name="terminoBusqueda"
						value={terminoBusqueda}
						onChange={(e: any) => setTerminoBusqueda(e.target.value)}
					/>

					<Button onClick={handleSearch}>Buscar</Button>
				</div>
			</div>
			{hasPendingEntregas ? (
				<>
					<div className="table_header table_row_entregas">
						<p>
							<strong>Hospital</strong>
						</p>
						<p>
							<strong>Numero de casos covid</strong>
						</p>
						<p>
							<strong>Insumo</strong>
						</p>
						<p>
							<strong>Cantidad en bodega</strong>
						</p>
						<p>
							<strong>Cantidad asignada</strong>
						</p>
						<p>
							<strong>Asignado</strong>
						</p>
						<p>
							<strong>Asignar</strong>
						</p>
					</div>
					{asignacionesFiltradas
						.filter(
							(asignacion: any) => !asignacion.asignado && !asignacion.borrado
						)
						.map((asignacion: any) => (
							<div
								key={asignacion.asignacionId}
								className="table_row table_row_entregas ">
								<p>{asignacion.nombreHospital}</p>
								<p> {asignacion.casosCovid}</p>
								<p> {asignacion.nombreInsumo}</p>
								<p> {asignacion.cantidadTotalEnBodega}</p>
								<p> {asignacion.cantidadAsignada}</p>
								<p> {asignacion.asignado ? "Si" : "No"}</p>

								<input
									type="radio"
									name="asignacionSeleccionada"
									onChange={() => handleSeleccionarAsignacion(asignacion)}
								/>
							</div>
						))}
				</>
			) : (
				<p>No hay asignaciones para mostrar</p>
			)}

			<h2>Entregas</h2>
			{entregasFiltradas.length > 0 ? (
				<>
					<div className="table_header table_row_entregados">
						<p>
							<strong>Hospital</strong>
						</p>
						<p>
							<strong>Numero de casos covid</strong>
						</p>
						<p>
							<strong>Insumo</strong>
						</p>
						<p>
							<strong>Cantidad en bodega</strong>
						</p>
						<p className="center">
							<strong>Cantidad asignada</strong>
						</p>
					</div>
					{entregasFiltradas.map((entrega: any) =>
						entrega.entregaId ? (
							<div
								key={entrega.entregaId}
								className="table_row table_row_entregados">
								<p> {entrega.nombreHospital}</p>
								<p> {entrega.casosCovid}</p>
								<p> {entrega.nombreInsumo}</p>
								<p> {entrega.cantidadEntregada}</p>
								<p className="center"> {entrega.fechaEntrega.slice(0, 10)}</p>
							</div>
						) : null
					)}
				</>
			) : (
				<p>No hay entregas para mostrar</p>
			)}
		</div>
	);
};

export default Entregas;
