import { saveInsumo } from "@/services/organizacionDash.services";
import React, { useState } from "react";
import InputText from "./Input/Input";

const InsumoForm = ({ onActualizar }: { onActualizar: any }) => {
	// Estados para cada campo del formulario
	const [tipo, setTipo] = useState("");
	const [cantidadTotalEnBodega, setCantidadTotalEnBodega] = useState("");
	const [cantidadDisponible, setCantidadDisponible] = useState("");

	const handleSubmit = (event: any) => {
		event.preventDefault();

		const nuevoInsumo = {
			tipo,
			cantidadTotalEnBodega: cantidadTotalEnBodega,
			cantidadDisponible: cantidadDisponible,
		};
		saveInsumo(nuevoInsumo);
		setTipo("");
		setCantidadTotalEnBodega("");
		setCantidadDisponible("");
		onActualizar();
	};

	return (
		<form onSubmit={handleSubmit} className="">
			<InputText
				label="Tipo"
				id="type"
				name="type"
				value={tipo}
				onChange={(e) => setTipo(e.target.value)}
			/>

			<InputText
				label="Cantidad Total en Bodega"
				type="number"
				id="type"
				name="cantidadTotalEnBodega"
				value={cantidadTotalEnBodega}
				onChange={(e) => setCantidadTotalEnBodega(e.target.value)}
			/>

			<InputText
				label="Cantidad Disponible"
				type="number"
				id="cantidadDisponible"
				name="cantidadDisponible"
				value={cantidadDisponible}
				onChange={(e) => setCantidadDisponible(e.target.value)}
			/>

			<button type="submit">Crear </button>
		</form>
	);
};

export default InsumoForm;
