"use client";
import Button from "@/components/Button/Button";
import InsumoForm from "@/components/InsumoForm";
import InsumosComponent from "@/components/InsumosOrgCard";
import {
  getHospitales,
  getInsumos,
  removeInsumo,
} from "@/services/organizacionDash.services";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "../page.module.css";
import { useRouter } from "next/navigation";
import "./insumos.css";
import Swal from "sweetalert2";
export default function Insumos() {
  const [showCrear, setShowCrear] = useState(true);
  const [actualizar, setActualizar] = useState(0);
  const [insumos, setInsumos] = useState([]);
  const [hospitales, setHospitales] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchInsumos = async () => {
      const data = await getInsumos();
      setInsumos(data);
    };
    const fetchHospital = async () => {
      const hospitalData = await getHospitales();
      setHospitales(hospitalData);
    };
    fetchInsumos();
    fetchHospital();
  }, [actualizar]);

  const handleShowCrearInsumo = () => {
    setShowCrear(!showCrear);
  };

  const handleBorrarInsumo = async (insumoId: number) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás revertir esto",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, bórralo",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const eliminado = await removeInsumo(insumoId);
        if (eliminado.error) {
          Swal.fire(
            "Error",
            "Error al eliminar insumos, inténtalo de nuevo",
            "error"
          );
          return;
        }
        Swal.fire("Eliminado", "El insumo ha sido eliminado.", "success");
        setActualizar(actualizar + 1);
      }
    });
  };

  return (
    <main className={styles.main}>
      <div className="insumos">
        <h2>Pagina principal insumos</h2>
        <div className="options">
          <Button onClick={() => router.push("/asignaciones")}>
            Asignar insumos
          </Button>

          <Button onClick={handleShowCrearInsumo}>Crear insumo</Button>

          {showCrear ? (
            <InsumoForm
              onActualizar={() => {
                setActualizar((prev) => prev + 1);
              }}
            />
          ) : null}
          {insumos
            .filter((item: any) => !item.borrado)
            .map((item: any, index: number) => (
              <InsumosComponent
                key={index}
                item={item}
                onBorrar={() => handleBorrarInsumo(item.insumoId)}
              />
            ))}
        </div>
      </div>
    </main>
  );
}
