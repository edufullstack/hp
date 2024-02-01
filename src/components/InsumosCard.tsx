"use client";
import { getInsumos, saveAsignacion } from "@/services/hospitalDash.services";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Button from "./Button/Button";
import InputText from "./Input/Input";

const InsumosCard = ({
	setInsumos,
	hospital,
}: {
	setInsumos: any;
	hospital: any;
}) => {
	const [nombreInsumo, setNombreInsumo] = useState([]);
	const [insumoSeleccionado, setInsumoSeleccionado] = useState("");
	const [cantidad, setCantidad] = useState("");
	const [mostrarFormulario, setMostrarFormulario] = useState(false);

	useEffect(() => {
		const fetchInsumos = async () => {
			const nombre = await getInsumos();
			setNombreInsumo(nombre);
		};
		fetchInsumos();
	}, []);

	const handleSubmit = async (event: any) => {
		event.preventDefault();

		const fechaActual = new Date();
		const data = {
			hospitalId: hospital.hospitalId.toString(),
			insumoId: insumoSeleccionado.toString(),
			cantidadAsignada: cantidad.toString(),
			fechaAsignacion: fechaActual.toString(),
		};
		let saved = await saveAsignacion(data);
		setInsumos(true);
		if (saved.error) {
			Swal.fire(
				"Error",
				"Error al solicitar insumos, inténtalo de nuevo",
				"error"
			);
			return;
		}
		setCantidad("");
		setInsumoSeleccionado("");
		setMostrarFormulario(false);
		Swal.fire("Éxito", "Insumos solicitados correctamente", "success");
	};

	const toggleFormulario = () => {
		setMostrarFormulario(!mostrarFormulario);
	};

	return (
		<div>
			<h2>Solicitar Insumos</h2>

			<Button
				type={mostrarFormulario ? "secondary" : ""}
				onClick={toggleFormulario}>
				{mostrarFormulario ? "Cancelar" : "Solicitar Insumos"}
			</Button>

			{mostrarFormulario && (
				<form onSubmit={handleSubmit}>
					<div>
						<label htmlFor="nombreInsumo">Seleccionar insumo:</label>
						<select
							className="select"
							id="nombreInsumo"
							value={insumoSeleccionado}
							onChange={(e) => setInsumoSeleccionado(e.target.value)}>
							<option value="">-- Selecciona un insumo --</option>
							{nombreInsumo.map((nombre: any) => (
								<option key={nombre.insumoId} value={nombre.insumoId}>
									{nombre.tipo}
								</option>
							))}
						</select>
					</div>

					<div>
						<InputText
							label="Cantidad"
							id="cantidad"
							name="cantidad"
							value={cantidad}
							onChange={(e) => setCantidad(e.target.value)}
						/>

						<Button type="submit">Enviar Solicitud</Button>
					</div>
				</form>
			)}
		</div>
	);
};

export default InsumosCard;
