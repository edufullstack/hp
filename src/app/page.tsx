"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import Validate from "@/utils/validateLogin";
import { Login } from "../types/global";
import { getHospitalInfo } from "@/services/hospitalDash.services";
import { setOrganizationInfo } from "@/services/organizacionDash.services";

export default function Home() {
  const [disabled, setDisabled] = useState(true);
  const [showLoginForm, setShowLoginForm] = useState("");
  const [errors, setErrors] = useState<Login>({});
  const [input, setInput] = useState({
    name: "",
  });

  const router = useRouter();

  const handleSelection = (type: string) => {
    setShowLoginForm(type);
  };

  const handleChange = (event: any) => {
    setInput({ ...input, [event.target.name]: event.target.value });
    setErrors(Validate({ ...input, [event.target.name]: event.target.value }));

    const newErrors = Validate({
      ...input,
      [event.target.name]: event.target.value,
    });
    const hasErrors = Object.keys(newErrors).length > 0;
    setDisabled(hasErrors);
  };

  const handleSubmitHospital = async (event: any) => {
    event.preventDefault();
    if (Object.keys(errors).length === 0) {
      let hospitalResponse = await getHospitalInfo(input.name, true);
      if (!hospitalResponse.error) {
        router.push("/hospitalDash");
      } else {
        //TODO agregar sweet alert
        alert("Error en el servidor, intente de nuevo");
        setShowLoginForm("");
      }
    } else {
      //TODO agregar sweet alert
      alert("Por favor intente de nuevo");
    }
  };

  const handleSubmitOrganization = (event: any) => {
    event.preventDefault();
    if (Object.keys(errors).length === 0) {
      setOrganizationInfo();
      router.push("/organizacionDash");
    } else {
      //TODO agregar sweet alert
      alert("Por favor intente de nuevo");
    }
  };

  return (
    <div>
      {showLoginForm === "" ? (
        <div>
          <h1>Bienvenido a Nuestra Plataforma</h1>
          <p>Por favor, elige tu tipo de usuario:</p>
          <button onClick={() => handleSelection("hospital")}>
            Soy un Hospital
          </button>
          <button onClick={() => handleSelection("organizacion")}>
            Soy una Organización
          </button>
        </div>
      ) : showLoginForm === "hospital" ? (
        <form onSubmit={handleSubmitHospital}>
          <h2>Ingrese nombre de hospital</h2>

          <div>
            <label htmlFor="name">Nombre:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={input.name}
              onChange={handleChange}
            />
            <br />
            {errors.name ? errors.name : null}
          </div>

          <button type="submit" disabled={disabled}>
            Entrar
          </button>
          <hr></hr>
          <button onClick={() => handleSelection("")}>Regresar</button>
        </form>
      ) : (
        <div>
          <form onSubmit={handleSubmitOrganization}>
            <h2>Login Simulado</h2>

            <div>
              <label htmlFor="username">Nombre de Usuario:</label>
              <input
                type="text"
                id="username"
                name="username"
                value="usuario_predeterminado"
                readOnly
              />
            </div>

            <div>
              <label htmlFor="password">Contraseña:</label>
              <input
                type="password"
                id="password"
                name="password"
                value="contraseña_secreta"
                readOnly
              />
            </div>

            <button type="submit">Entrar</button>
            <hr></hr>
            <button onClick={() => handleSelection("")}>Regresar</button>
          </form>
        </div>
      )}
    </div>
  );
}
