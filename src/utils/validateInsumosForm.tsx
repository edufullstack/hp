const validateInsumoForm = (input: any) => {
  let errors: any = {};

  if (!input.tipo) {
    errors.tipo = "El tipo de insumo es obligatorio.";
  } else if (!/^[a-zA-Z0-9\s]*$/.test(input.tipo)) {
    errors.tipo = "El tipo solo debe contener letras, números y espacios.";
  }

  if (!input.cantidadTotalEnBodega) {
    errors.cantidadTotalEnBodega =
      "La cantidad total en bodega es obligatoria.";
  } else if (
    isNaN(input.cantidadTotalEnBodega) ||
    input.cantidadTotalEnBodega < 0
  ) {
    errors.cantidadTotalEnBodega = "La cantidad debe ser un número positivo.";
  }

  if (!input.cantidadDisponible) {
    errors.cantidadDisponible = "La cantidad disponible es obligatoria.";
  } else if (isNaN(input.cantidadDisponible) || input.cantidadDisponible < 0) {
    errors.cantidadDisponible = "La cantidad debe ser un número positivo.";
  }

  return errors;
};

export default validateInsumoForm;
