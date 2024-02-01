"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
	getAsignaciones,
	removeAsignacion,
	updateAsignacion,
} from "@/services/organizacionDash.services";
import Swal from "sweetalert2";
import Button from "@/components/Button/Button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import InputText from "@/components/Input/Input";
import "./asignaciones.css";
const Asignaciones = () => {
	const [asignaciones, setAsignaciones] = useState([]);
	const [asignacionSeleccionada, setAsignacionSeleccionada] =
		useState<any>(null);
	const [terminoBusqueda, setTerminoBusqueda] = useState("");
	const [sortType, setSortType] = useState("");
	const [asignacionesFiltradas, setAsignacionesFiltradas] = useState([]);
	const [actualizar, setActualizar] = useState(0);
	const router = useRouter();
	useEffect(() => {
		const obtenerAsignacionesPendientes = async () => {
			const data = await getAsignaciones();
			setAsignaciones(data);
			setAsignacionesFiltradas(data);
		};
		obtenerAsignacionesPendientes();
	}, [actualizar]);

	useEffect(() => {
		aplicarFiltrosYOrdenamiento();
	}, [sortType, terminoBusqueda, asignaciones]);

	const aplicarFiltrosYOrdenamiento = () => {
		let resultado = [...asignaciones].filter(
			(asignacion: any) =>
				asignacion.nombreHospital
					.toLowerCase()
					.includes(terminoBusqueda.toLowerCase()) ||
				asignacion.nombreInsumo
					.toLowerCase()
					.includes(terminoBusqueda.toLowerCase())
		);

		if (sortType === "mayor-casos-covid") {
			resultado.sort((a: any, b: any) => b.casosCovid - a.casosCovid);
		} else if (sortType === "menor-casos-covid") {
			resultado.sort((a: any, b: any) => a.casosCovid - b.casosCovid);
		}

		setAsignacionesFiltradas(resultado);
	};

	const handleSeleccionarAsignacion = (asignacion: any) => {
		setAsignacionSeleccionada(asignacion);
	};

	const handleBusqueda = () => {
		aplicarFiltrosYOrdenamiento();
	};

	const handleActualizarAsignacion = async ({
		asignacionId,
		cantidadDisponible,
		cantidadAsignada,
		insumoId,
	}: {
		asignacionId: number;
		cantidadDisponible: number;
		cantidadAsignada: number;
		insumoId: number;
	}) => {
		Swal.fire({
			title: "¿Estás seguro?",
			text: "Estás por actualizar la asignación",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Sí, actualizar",
			cancelButtonText: "Cancelar",
		}).then(async (result) => {
			if (result.isConfirmed) {
				if (cantidadDisponible < cantidadAsignada) {
					await Swal.fire({
						icon: "error",
						title: "Oops...",
						text: "Insumos insuficientes",
					});
					return;
				}
				try {
					let updated = await updateAsignacion({
						asignacionId,
						cantidadDisponible,
						cantidadAsignada,
						insumoId,
					});
					if (updated.error) {
						Swal.fire("Error", "Error al asignar, inténtalo de nuevo", "error");
						return;
					}
					const data = await getAsignaciones();
					setAsignaciones(data);

					setAsignacionSeleccionada(null);
					Swal.fire("Éxito", "Asignacion actualizada correctamente", "success");
				} catch (error) {
					console.error("Error al actualizar la asignación:", error);
					Swal.fire(
						"Error",
						"Error al actualizar, inténtalo de nuevo",
						"error"
					);
				}
			}
		});
	};

	const handleOrder = (event: any) => {
		setSortType(event.target.value);
		// aplicarFiltrosYOrdenamiento();
	};

	const handleBorrarAsignacion = async (id: number) => {
		Swal.fire({
			title: "¿Estás seguro?",
			text: "No podrás revertir esto",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Sí, bórralo",
			cancelButtonText: "Cancelar",
		}).then(async (result) => {
			if (result.isConfirmed) {
				const eliminado = await removeAsignacion(id);
				if (eliminado.error) {
					Swal.fire(
						"Error",
						"Error al eliminar la asignación, inténtalo de nuevo",
						"error"
					);
				} else {
					Swal.fire("Eliminado", "La asignación ha sido eliminada.", "success");
					setActualizar(actualizar + 1);
				}
			}
		});
	};

	return (
		<>
			<div className="subtitle_back">
				<Button type="icon" onClick={() => router.push("/organizacionDash")}>
					<Image alt="back" width={20} height={20} src="./back.svg" />
				</Button>
				<h2 className="subtitle">Asignacion de insumos</h2>
			</div>

			<div className="form_insumos">
				<div className="asignar_insumos">
					<Button
						onClick={() => {
							if (asignacionSeleccionada) {
								handleActualizarAsignacion({
									asignacionId: asignacionSeleccionada.asignacionId,
									cantidadDisponible: asignacionSeleccionada.cantidadDisponible,
									cantidadAsignada: asignacionSeleccionada.cantidadAsignada,
									insumoId: asignacionSeleccionada.insumoId,
								});
							} else {
								Swal.fire({
									icon: "warning",
									title: "Atención",
									text: "Debes seleccionar una solicitud primero.",
								});
							}
						}}>
						Asignar
					</Button>
					<div className="search">
						<InputText
							id="terminoBusqueda"
							name="terminoBusqueda"
							value={terminoBusqueda}
							onChange={(e: any) => setTerminoBusqueda(e.target.value)}
						/>
						<Button onClick={handleBusqueda}>Buscar</Button>
					</div>
				</div>
				<select onChange={handleOrder} className="select right">
					<option value="">Seleccione para ordenar</option>
					<option value="mayor-casos-covid">Mayor casos covid</option>
					<option value="menor-casos-covid">Menor casos covid</option>
				</select>
			</div>
			<div className="table_insumos">
				<div className="table_header table_row_asignacion_insumos">
					<p>Hospital</p>
					<p>Numero de casos covid</p>
					<p>Insumo</p>
					<p>Cantidad disponible</p>
					<p>Cantidad solicitada</p>
					<p>Asignado</p>
					<p>Borrar</p>
					<p>Asignar</p>
				</div>
				{asignacionesFiltradas.map((asignacion: any) =>
					!asignacion.borrado ? (
						<div
							key={asignacion.asignacionId}
							className="table_row table_row_asignacion_insumos">
							<p> {asignacion.nombreHospital}</p>
							<p className="center"> {asignacion.casosCovid}</p>
							<p> {asignacion.nombreInsumo}</p>
							<p className="center"> {asignacion.cantidadDisponible}</p>
							<p className="center"> {asignacion.cantidadAsignada}</p>
							<p className="center"> {asignacion.asignado ? "Si" : "No"}</p>
							{!asignacion.asignado ? (
								<button
									onClick={() =>
										handleBorrarAsignacion(asignacion.asignacionId)
									}>
									Borrar
								</button>
							) : null}

							{!asignacion.asignado ? (
								<p className="center">
									<input
										type="radio"
										name="asignacionSeleccionada"
										onChange={() => handleSeleccionarAsignacion(asignacion)}
									/>
								</p>
							) : null}
						</div>
					) : null
				)}
			</div>

			{/* {showForm && (
        <div>
          <h1>Formulario de Asignación</h1>
          <p>Hospital: {asignacionSeleccionada.nombreHospital}</p>
          <p>Numero de casos covid: {asignacionSeleccionada.casosCovid}</p>
          <p>Insumo: {asignacionSeleccionada.nombreInsumo}</p>
          <p>
            Cantidad disponible: {asignacionSeleccionada.cantidadDisponible}
          </p>
          <p>Cantidad solicitada: {asignacionSeleccionada.cantidadAsignada}</p>
          <p>Asignado: {asignacionSeleccionada.asignado ? "Si" : "No"}</p>
          <button
            onClick={() =>
              handleActualizarAsignacion({
                asignacionId: asignacionSeleccionada.asignacionId,
                cantidadDisponible: asignacionSeleccionada.cantidadDisponible,
                cantidadAsignada: asignacionSeleccionada.cantidadAsignada,
                insumoId: asignacionSeleccionada.insumoId,
              })
            }
          >
            Enviar
          </button> 
        </div>
      )}*/}
		</>
	);
};

export default Asignaciones;
