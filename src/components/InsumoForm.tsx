import { saveInsumo } from "@/services/organizacionDash.services";
import React, { useState } from "react";
import validateInsumoForm from "@/utils/validateInsumosForm";
import Swal from "sweetalert2";
import InputText from "./Input/Input";
import Button from "./Button/Button";

const InsumoForm = ({ onActualizar }: { onActualizar: any }) => {
	const [errors, setErrors] = useState<any>({});
	const [input, setInput] = useState({
		tipo: "",
		cantidadTotalEnBodega: "",
		cantidadDisponible: "",
	});
	const [disabled, setDisabled] = useState(true);

	const handleSubmit = async (event: any) => {
		event.preventDefault();

		const nuevoInsumo = {
			tipo: input.tipo,
			cantidadTotalEnBodega: input.cantidadTotalEnBodega,
			cantidadDisponible: input.cantidadDisponible,
		};

		if (Object.keys(errors).length === 0) {
			let saved = await saveInsumo(nuevoInsumo);
			setInput({
				tipo: "",
				cantidadTotalEnBodega: "",
				cantidadDisponible: "",
			});
			onActualizar();
			if (saved.error) {
				Swal.fire(
					"Error",
					"Error en registro de casos, intente de nuevo",
					"error"
				);
				return;
			}
			Swal.fire(
				"Éxito",
				"Registro de casos actualizado correctamente",
				"success"
			);
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
		<form onSubmit={handleSubmit} className="form_fields">
			<div>
				<InputText
					label="Tipo"
					id="tipo"
					name="tipo"
					value={input.tipo}
					onChange={handleChange}
				/>
				{errors.tipo && <p className="error">{errors.tipo}</p>}
			</div>
			<div>
				<InputText
					label="Cantidad Total en Bodega"
					id="cantidadTotalEnBodega"
					name="cantidadTotalEnBodega"
					value={input.cantidadTotalEnBodega}
					onChange={handleChange}
				/>

				{errors.cantidadTotalEnBodega && (
					<p className="error">{errors.cantidadTotalEnBodega}</p>
				)}
			</div>
			<div>
				<InputText
					label="Cantidad Disponible"
					id="cantidadDisponible"
					name="cantidadDisponible"
					value={input.cantidadDisponible}
					onChange={handleChange}
				/>

				{errors.cantidadDisponible && (
					<p className="error">{errors.cantidadDisponible}</p>
				)}
			</div>
			<Button type="submit" disabled={disabled}>
				Crear
			</Button>
		</form>
	);
};

export default InsumoForm;
