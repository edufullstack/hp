import React from "react";

const HospitalCard = ({ item }: { item: any }) => {
  return (
    <div>
      <p>Nombre: {item.nombre}</p>
      <p>Numero casos codiv último mes: {item.numeroCasosCovidUltimoMes}</p>
      <p>Borrado: {item.borrado ? "Sí" : "No"}</p>
    </div>
  );
};

export default HospitalCard;
