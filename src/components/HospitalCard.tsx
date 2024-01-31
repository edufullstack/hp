import React from "react";

const HospitalCard = ({ item, onEliminar }: { item: any; onEliminar: any }) => {
  return (
    <div>
      <p>Nombre: {item.nombre}</p>
      <p>Numero casos codiv último mes: {item.numeroCasosCovidUltimoMes}</p>
      <button onClick={onEliminar}>Borrar</button>
    </div>
  );
};

export default HospitalCard;
