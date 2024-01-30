import { Login } from "@/types/global";

const Validate = (input: Login) => {
  let errors: Login = {};

  // Name validation
  if (!input.name) {
    errors.name = "Por favor ingrese un nombre";
  } else if (!/^[a-zA-Z\s]*$/.test(input.name)) {
    errors.name = "Nombres solo deben contener letras y espacios";
  }

  return errors;
};

export default Validate;
