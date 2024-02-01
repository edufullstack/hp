import { Login } from "@/types/global";

const Validate = (input: Login) => {
  let errors: Login = {};

  if (!input.name) {
    errors.name = "Por favor ingrese un nombre";
  } else if (!/^[a-zA-Z0-9\s]*$/.test(input.name)) {
    errors.name = "Nombres solo deben contener letras, números y espacios";
  }

  return errors;
};

export default Validate;
