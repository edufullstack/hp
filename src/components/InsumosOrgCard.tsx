import React from "react";

const InsumosComponent = ({ item, onBorrar }: { item: any; onBorrar: any }) => {
	return (
		<div className="table_row table_row_insumos">
			<p> {item.tipo}</p>
			<p> {item.cantidadTotalEnBodega}</p>
			<p> {item.cantidadDisponible}</p>
			<button onClick={onBorrar}>Borrar</button>
		</div>
	);
};

export default InsumosComponent;
