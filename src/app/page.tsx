"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const [userType, setUserType] = useState("");
  const router = useRouter();

  const handleSelection = (type: any) => {
    setUserType(type);
    if (type === "hospital") {
      router.push("/hospitales");
    }
    // Aquí puedes manejar la redirección o cargar componentes adicionales basados en el tipo de usuario
  };

  return (
    <div>
      <h1>Bienvenido a Nuestra Plataforma</h1>
      <p>Por favor, elige tu tipo de usuario:</p>
      <div>
        <button onClick={() => handleSelection("hospital")}>
          Soy un Hospital
        </button>
        <button onClick={() => handleSelection("organizacion")}>
          Soy una Organización
        </button>
      </div>

      {userType === "hospital" && (
        <div>
          {/* Componentes o redirección específica para hospitales */}
          <p>Sección para hospitales.</p>
        </div>
      )}

      {userType === "organizacion" && (
        <div>
          {/* Componentes o redirección específica para organizaciones */}
          <p>Sección para organizaciones.</p>
        </div>
      )}
    </div>
  );
}
