import React from "react";

const HospitalCard = ({ item, onEliminar }: { item: any; onEliminar: any }) => {
	return (
		<div className="table_row table_row_hospitales">
			<p>{item.nombre}</p>
			<p> {item.numeroCasosCovidUltimoMes}</p>
			<button onClick={onEliminar}>Borrar</button>
		</div>
	);
};

export default HospitalCard;
