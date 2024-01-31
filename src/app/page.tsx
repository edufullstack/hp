"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import Validate from "@/utils/validateLogin";
import { Login } from "../types/global";
import { getHospitalInfo } from "@/services/hospitalDash.services";
import { setOrganizationInfo } from "@/services/organizacionDash.services";
import Button from "@/components/Button/Button";
import InputText from "@/components/Input/Input";

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
        <div className="login">
          <h1>Bienvenido a Nuestra Plataforma</h1>
          <p>Por favor, elige tu tipo de usuario:</p>
          <div className="buttons">
            <Button type="secondary" onClick={() => handleSelection("hospital")}>
              Soy un Hospital
            </Button>
            <Button  onClick={() => handleSelection("organizacion")}>
              Soy una Organización
            </Button>
          </div>
        </div>
      ) : showLoginForm === "hospital" ? (
        <form onSubmit={handleSubmitHospital} className="form_">
          <div className="subtitle_back">
            <Button onClick={() => handleSelection("")}>Regresar</Button>
            <h2 className="subtitle">Ingrese nombre de hospital</h2>
          </div>

          <div >
            <label htmlFor="name"></label>
            <InputText
              label="Nombre"
              id="name"
              name="name"
              value={input.name}
              onChange={handleChange}
            />
            <br />
            {errors.name ? errors.name : null}
          </div>

          <Button type="submit" disabled={disabled}>
            Entrar
          </Button>
         
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
          </form>
        </div>
      )}
    </div>
  );
}
