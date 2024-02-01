const validateHospitalForm = (input: any) => {
  let errors: any = {};

  if (!input.nombre) {
    errors.nombre = "El nombre del hospital es obligatorio.";
  } else if (!/^[a-zA-Z0-9\s]*$/.test(input.nombre)) {
    errors.nombre = "El nombre solo debe contener letras, números y espacios.";
  }

  if (!input.numeroCasosCovidUltimoMes) {
    errors.numeroCasosCovidUltimoMes = "Este campo es obligatorio.";
  } else if (input.numeroCasosCovidUltimoMes < 0) {
    errors.numeroCasosCovidUltimoMes =
      "El número de casos no puede ser negativo.";
  }

  return errors;
};

export default validateHospitalForm;
