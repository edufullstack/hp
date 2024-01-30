import { fetchData } from "@/utils/fetch";
import storageData from "@/utils/storage";

export const getHospitalInfo = async (name: string, remember?: boolean) => {
  try {
    const hospitalInfo = await fetchData({
      url: `hospital?name=${name}`,
      method: "GET",
      body: {},
    });
    if (hospitalInfo.statusCode === 500) {
      return { error: "Error en servidor", status: 500 };
    }
    if (hospitalInfo.statusCode === 400) {
      return { error: "Error parametro faltante", status: 400 };
    }

    storageData.saveData("user", hospitalInfo);

    return { error: "", statusCode: 200 };
  } catch (error) {
    throw { statusCode: 500, error };
  }
};

export const getPedidosHospital = async (id: number) => {
  try {
    const pedidosInfo = await fetchData({
      url: `asignaciones/${id}`,
      method: "GET",
      body: {},
    });
    if (pedidosInfo.statusCode === 500) {
      return { error: "Error en servidor", status: 500 };
    }
    if (pedidosInfo.statusCode === 400) {
      return { error: "Error parametro faltante", status: 400 };
    }

    const promesas = pedidosInfo.map((pedido: any) =>
      getInsumosId(pedido.insumoId).then((nombreInsumo) => {
        return { ...pedido, tipo: nombreInsumo[0].tipo };
      })
    );

    const pedidosActualizados = await Promise.all(promesas);
    return pedidosActualizados;
  } catch (error) {
    throw { statusCode: 500, error };
  }
};

export const getPedidos = async (id: number) => {
  try {
    const pedidosInfo = await fetchData({
      url: `asignaciones/${id}`,
      method: "GET",
      body: {},
    });
    if (pedidosInfo.statusCode === 500) {
      return { error: "Error en servidor", status: 500 };
    }
    if (pedidosInfo.statusCode === 400) {
      return { error: "Error parametro faltante", status: 400 };
    }

    return pedidosInfo;
  } catch (error) {
    throw { statusCode: 500, error };
  }
};

export const getInsumosId = async (id: number) => {
  try {
    const insumos = await fetchData({
      url: `insumos/${id}`,
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

export const saveAsignacion = async ({
  hospitalId,
  insumoId,
  cantidadAsignada,
  fechaAsignacion,
}: {
  hospitalId: string;
  insumoId: string;
  cantidadAsignada: string;
  fechaAsignacion: string;
}) => {
  try {
    const insumos = await fetchData({
      url: `asignaciones/`,
      method: "POST",
      body: { hospitalId, insumoId, cantidadAsignada, fechaAsignacion },
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

export const updateCasosCovid = async ({
  hospitalId,
  casosCovid,
}: {
  hospitalId: number;
  casosCovid: string;
}) => {
  try {
    const insumos = await fetchData({
      url: `hospital/${hospitalId}`,
      method: "PUT",
      body: { numeroCasosCovidUltimoMes: casosCovid },
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
