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
    <div className="pedido">
      <p>
        <strong>Estado del Pedido:</strong> {status ? "Asignado" : "Pendiente"}
      </p>
      <p>
        <strong>Cantidad de Insumos:</strong> {cantidad}
      </p>
      <p>
        <strong>Nombre del Insumo:</strong> {nombreInsumo}
      </p>
    </div>
  );
};

export default PedidosCard;
