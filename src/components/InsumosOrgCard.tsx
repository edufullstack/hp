import React from "react";

const InsumosComponent = ({ item }: { item: any }) => {
  return (
    <div>
      <p>Tipo: {item.tipo}</p>
      <p>Cantidad total en bodega: {item.cantidadTotalEnBodega}</p>
      <p>Cantidad disponible: {item.cantidadDisponible}</p>
      <p>Borrado: {item.borrado ? "Sí" : "No"}</p>
    </div>
  );
};

export default InsumosComponent;
