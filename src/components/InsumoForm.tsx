import { saveInsumo } from "@/services/organizacionDash.services";
import React, { useState } from "react";
import validateInsumoForm from "@/utils/validateInsumosForm"; // Asegúrate de importar la función de validación

const InsumoForm = ({ onActualizar }: { onActualizar: any }) => {
	const [errors, setErrors] = useState<any>({});
	const [input, setInput] = useState({
		tipo: "",
		cantidadTotalEnBodega: "",
		cantidadDisponible: "",
	});
	const [disabled, setDisabled] = useState(true);

	const handleSubmit = (event: any) => {
		event.preventDefault();

		const nuevoInsumo = {
			tipo: input.tipo,
			cantidadTotalEnBodega: input.cantidadTotalEnBodega,
			cantidadDisponible: input.cantidadDisponible,
		};

		if (Object.keys(errors).length === 0) {
			saveInsumo(nuevoInsumo);
			setInput({
				tipo: "",
				cantidadTotalEnBodega: "",
				cantidadDisponible: "",
			});
			onActualizar();
		}
	};

	const handleChange = (event: any) => {
		setInput({ ...input, [event.target.name]: event.target.value });
		setErrors(
			validateInsumoForm({ ...input, [event.target.name]: event.target.value })
		);

		const newErrors = validateInsumoForm({
			...input,
			[event.target.name]: event.target.value,
		});
		const hasErrors = Object.keys(newErrors).length > 0;
		setDisabled(hasErrors);
	};

	return (
		<form onSubmit={handleSubmit}>
			<div>
				<label>Tipo:</label>
				<input
					type="text"
					name="tipo"
					value={input.tipo}
					onChange={handleChange}
				/>
				{errors.tipo && <p>{errors.tipo}</p>}
			</div>
			<div>
				<label>Cantidad Total en Bodega:</label>
				<input
					type="number"
					name="cantidadTotalEnBodega"
					value={input.cantidadTotalEnBodega}
					onChange={handleChange}
				/>
				{errors.cantidadTotalEnBodega && <p>{errors.cantidadTotalEnBodega}</p>}
			</div>
			<div>
				<label>Cantidad Disponible:</label>
				<input
					type="number"
					name="cantidadDisponible"
					value={input.cantidadDisponible}
					onChange={handleChange}
				/>
				{errors.cantidadDisponible && <p>{errors.cantidadDisponible}</p>}
			</div>
			<button type="submit" disabled={disabled}>
				Crear
			</button>
		</form>
	);
};

export default InsumoForm;
