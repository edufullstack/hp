import { updateCasosCovid } from "@/services/hospitalDash.services";
import storageData from "@/utils/storage";
import { useState } from "react";

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

  const handleClick = () => {
    setMostrarFormulario(!mostrarFormulario);
  };
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    let casosCovid = event.target.casosCovid.value;
    let data = {
      hospitalId,
      casosCovid,
    };
    await updateCasosCovid(data);
    const hospitalData = storageData.getData("user");
    if (hospitalData[0]) {
      hospitalData[0].numeroCasosCovidUltimoMes = casosCovid;
    }
    storageData.saveData("user", JSON.stringify(hospitalData));
    onActualizar();
  };
  return (
    <div className="caso-covid">
      <h3>Reporte de COVID-19</h3>
      <p>
        <strong>Total de Casos:</strong> {casos}
      </p>

      <h3>Registrar Casos de COVID</h3>
      <button onClick={handleClick}>
        {mostrarFormulario ? "Ocultar Formulario" : "Registrar Caso"}
      </button>

      {mostrarFormulario && (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="casosCovid">Cantidad de Casos:</label>
            <input type="number" id="casosCovid" name="casosCovid" />
          </div>

          <button type="submit">Enviar Registro</button>
        </form>
      )}
    </div>
  );
};

export default CasosCovid;
