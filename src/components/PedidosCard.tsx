const PedidosCard = ({
	status,
	cantidad,
	nombreInsumo,
}: {
	status: boolean;
	cantidad: number;
	nombreInsumo: string;
}) => {
	return (
		<div className="table_row table_row_pedidos  ">
			<p>{status ? "Asignado" : "Pendiente"}</p>
			<p>{cantidad}</p>
			<p>{nombreInsumo}</p>
		</div>
	);
};

export default PedidosCard;
