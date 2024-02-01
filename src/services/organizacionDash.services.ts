import { fetchData } from "@/utils/fetch";
import storageData from "@/utils/storage";
import Swal from "sweetalert2";

export const setOrganizationInfo = async () => {
  try {
    storageData.saveData("user", { user: "organization" });

    return { error: "", statusCode: 200 };
  } catch (error) {
    throw { statusCode: 500, error };
  }
};

export const getInsumos = async () => {
  try {
    const insumos = await fetchData({
      url: `insumos/`,
      method: "GET",
      body: {},
    });
    if (insumos.statusCode === 500) {
      return { error: "Error en servidor", status: 500 };
    }
    if (insumos.statusCode === 400) {
      return { error: "Error parametro faltante", status: 400 };
    }

    return insumos;
  } catch (error) {
    throw { statusCode: 500, error };
  }
};

export const updateInsumos = async ({
  insumoId,
  actualizarCantidad,
}: {
  insumoId: number;
  actualizarCantidad: number;
}) => {
  try {
    const insumos = await fetchData({
      url: `insumos/${insumoId}`,
      method: "PUT",
      body: { cantidadDisponible: actualizarCantidad.toString() },
    });
    if (insumos.statusCode === 500) {
      return { error: "Error en servidor", status: 500 };
    }
    if (insumos.statusCode === 400) {
      return { error: "Error parametro faltante", status: 400 };
    }

    return insumos;
  } catch (error) {
    throw { statusCode: 500, error };
  }
};

export const getHospitales = async () => {
  try {
    const hospitales = await fetchData({
      url: `hospital/`,
      method: "GET",
      body: {},
    });
    if (hospitales.statusCode === 500) {
      return { error: "Error en servidor", status: 500 };
    }
    if (hospitales.statusCode === 400) {
      return { error: "Error parametro faltante", status: 400 };
    }
    return hospitales;
  } catch (error) {
    throw { statusCode: 500, error };
  }
};

export const getAsignaciones = async () => {
  try {
    const asignaciones = await fetchData({
      url: `asignaciones/`,
      method: "GET",
      body: {},
    });
    if (asignaciones.statusCode === 500) {
      return { error: "Error en servidor", status: 500 };
    }
    if (asignaciones.statusCode === 400) {
      return { error: "Error parametro faltante", status: 400 };
    }

    const insumos = await getInsumos();
    const hospitales = await getHospitales();

    const asignacionesEnriquecidas = asignaciones.map((asignacion: any) => {
      const insumo = insumos.find(
        (item: any) => item.insumoId === asignacion.insumoId
      );
      const hospital = hospitales.find(
        (hospital: any) => hospital.hospitalId === asignacion.hospitalId
      );
      return {
        ...asignacion,

        insumoId: insumo ? insumo.insumoId : "Desconocido",
        nombreInsumo: insumo ? insumo.tipo : "Desconocido",
        hospitalId: hospital ? hospital.hospitalId : "Desconocido",
        nombreHospital: hospital ? hospital.nombre : "Desconocido",
        cantidadTotalEnBodega: insumo
          ? insumo.cantidadTotalEnBodega
          : "Desconocido",
        cantidadDisponible: insumo ? insumo.cantidadDisponible : "Desconocido",
        casosCovid: hospital
          ? hospital.numeroCasosCovidUltimoMes
          : "Desconocido",
      };
    });
    return asignacionesEnriquecidas;
  } catch (error) {
    throw { statusCode: 500, error };
  }
};

export const saveInsumo = async ({
  tipo,
  cantidadTotalEnBodega,
  cantidadDisponible,
}: {
  tipo: string;
  cantidadTotalEnBodega: string;
  cantidadDisponible: string;
}) => {
  try {
    const insumos = await fetchData({
      url: `insumos/`,
      method: "POST",
      body: {
        tipo,
        cantidadTotalEnBodega,
        cantidadDisponible,
      },
    });
    if (insumos.statusCode === 500) {
      return { error: "Error en servidor", status: 500 };
    }
    if (insumos.statusCode === 400) {
      return { error: "Error parametro faltante", status: 400 };
    }

    return insumos;
  } catch (error) {
    throw { statusCode: 500, error };
  }
};

export const saveHospital = async ({
  nombre,
  numeroCasosCovidUltimoMes,
}: {
  nombre: string;
  numeroCasosCovidUltimoMes: string;
}) => {
  try {
    const hospital = await fetchData({
      url: `hospital/`,
      method: "POST",
      body: {
        nombre,
        numeroCasosCovidUltimoMes,
      },
    });
    if (hospital.statusCode === 500) {
      return { error: "Error en servidor", status: 500 };
    }
    if (hospital.statusCode === 400) {
      return { error: "Error parametro faltante", status: 400 };
    }

    return hospital;
  } catch (error) {
    throw { statusCode: 500, error };
  }
};

export const updateAsignacion = async ({
  asignacionId,
  cantidadDisponible,
  cantidadAsignada,
  insumoId,
}: {
  asignacionId: number;
  cantidadDisponible: number;
  cantidadAsignada: number;
  insumoId: number;
}) => {
  try {
    const actualizarCantidad = cantidadDisponible - cantidadAsignada;

    const asignado = await fetchData({
      url: `asignaciones/${Number(asignacionId)}`,
      method: "PUT",
      body: {
        asignado: "true",
      },
    });
    if (asignado.statusCode === 500) {
      return { error: "Error en servidor", status: 500 };
    }
    if (asignado.statusCode === 400) {
      return { error: "Error parametro faltante", status: 400 };
    }
    updateInsumos({ insumoId, actualizarCantidad });

    return asignado;
  } catch (error) {
    throw { statusCode: 500, error };
  }
};

export const getEntregas = async () => {
  try {
    const entregas = await fetchData({
      url: `entregas/`,
      method: "GET",
      body: {},
    });

    if (entregas.statusCode === 500) {
      return { error: "Error en servidor", status: 500 };
    }
    if (entregas.statusCode === 400) {
      return { error: "Error parametro faltante", status: 400 };
    }

    const asignaciones = await getAsignaciones();
    const insumos = await getInsumos();
    const hospitales = await getHospitales();

    const entregasEnriquecidas = entregas.map((entrega: any) => {
      const insumo = insumos.find(
        (item: any) => item.insumoId === entrega.insumoId
      );
      const hospital = hospitales.find(
        (hosp: any) => hosp.hospitalId === entrega.hospitalId
      );
      const asignacion = asignaciones.find(
        (item: any) => (item.asignacionId = entrega.asignacionId)
      );

      return {
        ...entrega,
        casosCovid: hospital
          ? hospital.numeroCasosCovidUltimoMes
          : "Desconocido",
        nombreInsumo: insumo ? insumo.tipo : "Desconocido",
        nombreHospital: hospital ? hospital.nombre : "Desconocido",
        asignado: asignacion ? asignacion.asignado : "Desconocido",
      };
    });
    return entregasEnriquecidas;
  } catch (error) {
    throw { statusCode: 500, error };
  }
};

export const removeInsumo = async (insumoId: number) => {
  try {
    const insumo = await fetchData({
      url: `insumos/${insumoId}`,
      method: "DELETE",
      body: {},
    });
    if (insumo.statusCode === 500) {
      return { error: "Error en servidor", status: 500 };
    }
    if (insumo.statusCode === 400) {
      return { error: "Error parametro faltante", status: 400 };
    }

    return insumo;
  } catch (error) {
    throw { statusCode: 500, error };
  }
};

export const removeHospital = async (id: number) => {
  try {
    const insumo = await fetchData({
      url: `hospital/${id}`,
      method: "DELETE",
      body: {},
    });
    if (insumo.statusCode === 500) {
      return { error: "Error en servidor", status: 500 };
    }
    if (insumo.statusCode === 400) {
      return { error: "Error parametro faltante", status: 400 };
    }

    return insumo;
  } catch (error) {
    throw { statusCode: 500, error };
  }
};

export const saveEntregas = async ({
  asignacionId,
  hospitalId,
  insumoId,
  cantidadAsignada,
  cantidadActualizarBodega,
}: {
  asignacionId: number;
  hospitalId: number;
  insumoId: number;
  cantidadAsignada: number;
  cantidadActualizarBodega: number;
}) => {
  try {
    const hoy = new Date();
    const fechaFormateada = hoy.toISOString();

    const entregas = await fetchData({
      url: `entregas/`,
      method: "POST",
      body: {
        asignacionId: asignacionId.toString(),
        hospitalId: hospitalId.toString(),
        insumoId: insumoId.toString(),
        cantidadEntregada: cantidadAsignada.toString(),
        fechaEntrega: fechaFormateada.toString(),
      },
    });
    if (entregas.statusCode === 500) {
      return { error: "Error en servidor", status: 500 };
    }
    if (entregas.statusCode === 400) {
      return { error: "Error parametro faltante", status: 400 };
    }

    await updateInsumosEntrega({
      insumoId,
      actualizarCantidad: cantidadActualizarBodega,
    });
    await removeAsignacion(asignacionId);

    return entregas;
  } catch (error) {
    throw { statusCode: 500, error };
  }
};

export const removeAsignacion = async (id: number) => {
  try {
    const asignacion = await fetchData({
      url: `asignaciones/${id}`,
      method: "DELETE",
      body: {},
    });
    if (asignacion.statusCode === 500) {
      return { error: "Error en servidor", status: 500 };
    }
    if (asignacion.statusCode === 400) {
      return { error: "Error parametro faltante", status: 400 };
    }

    return asignacion;
  } catch (error) {
    throw { statusCode: 500, error };
  }
};

export const updateInsumosEntrega = async ({
  insumoId,
  actualizarCantidad,
}: {
  insumoId: number;
  actualizarCantidad: number;
}) => {
  try {
    const insumos = await fetchData({
      url: `insumos/${insumoId}`,
      method: "PUT",
      body: { cantidadTotalEnBodega: actualizarCantidad.toString() },
    });
    if (insumos.statusCode === 500) {
      return { error: "Error en servidor", status: 500 };
    }
    if (insumos.statusCode === 400) {
      return { error: "Error parametro faltante", status: 400 };
    }

    return insumos;
  } catch (error) {
    throw { statusCode: 500, error };
  }
};
