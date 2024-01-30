import React from "react";

const InsumosComponent = ({ item, onBorrar }: { item: any; onBorrar: any }) => {
  return (
    <div>
      <p>Tipo: {item.tipo}</p>
      <p>Cantidad total en bodega: {item.cantidadTotalEnBodega}</p>
      <p>Cantidad disponible: {item.cantidadDisponible}</p>
      <button onClick={onBorrar}>Borrar</button>
    </div>
  );
};

export default InsumosComponent;
