import { updateCasosCovid } from "@/services/hospitalDash.services";
import storageData from "@/utils/storage";
import { useState } from "react";
import Swal from "sweetalert2";
import InputText from "./Input/Input";
import Button from "./Button/Button";

const CasosCovid = ({
	casos,
	hospitalId,
	onActualizar,
}: {
	casos: number;
	hospitalId: number;
	onActualizar: any;
}) => {
	const [mostrarFormulario, setMostrarFormulario] = useState(false);
	const [input, setInput] = useState({
		casosCovid: "",
	});

	const handleClick = () => {
		setMostrarFormulario(!mostrarFormulario);
	};

	const handleSubmit = async (event: any) => {
		event.preventDefault();
		const data = {
			hospitalId,
			casosCovid: input.casosCovid,
		};
		try {
			const updated = await updateCasosCovid(data);
			const hospitalData = storageData.getData("user");
			if (hospitalData && hospitalData[0]) {
				hospitalData[0].numeroCasosCovidUltimoMes = input.casosCovid;
				storageData.saveData("user", JSON.stringify(hospitalData));
			}
			setInput({ casosCovid: "" }); // Resetear el input
			onActualizar(); // Actualizar la UI según sea necesario
			Swal.fire(
				"Éxito",
				"Registro de casos actualizado correctamente",
				"success"
			);
		} catch (error) {
			Swal.fire(
				"Error",
				"Error en registro de casos, intente de nuevo",
				"error"
			);
		} finally {
			setMostrarFormulario(false); // Asegurar que el formulario se oculte después de enviar
		}
	};

	const handleChange = (event: any) => {
		setInput({ ...input, [event.target.name]: event.target.value });
	};

	return (
		<div className="caso-covid">
			<h3>Reporte de COVID-19</h3>
			<p>
				<strong>Total de Casos:</strong> {casos}
			</p>

			<Button type={mostrarFormulario ? "secondary" : ""} onClick={handleClick}>
				{mostrarFormulario ? "Ocultar Formulario" : "Registrar Caso"}
			</Button>

			{mostrarFormulario && (
				<form onSubmit={handleSubmit}>
					<div className="with_button">
						<InputText
							label="Cantidad de Casos"
							id="casosCovid"
							name="casosCovid"
							type="number"
							value={input.casosCovid}
							onChange={handleChange}
						/>

						<Button type="submit">Enviar Registro</Button>
					</div>
				</form>
			)}
		</div>
	);
};

export default CasosCovid;
