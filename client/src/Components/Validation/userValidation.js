import * as yup from "yup";

// login validate
const LoginValidation = yup.object().shape({
  email: yup.string().email().required("Email is required").trim(),
  password: yup
    .string()
    .required("password is required")
    .min(4, "Password must be at least 6 characters")
    .max(20, "Password must be les than 20 characters")
    .matches(/(?=.*[0-9])/, "Password must contain a number"),
});

// register validate
const RegisterValidation = yup.object().shape({
  email: yup.string().email().required("Email is required").trim(),
  password: yup
    .string()
    .required("password is required")
    .min(4, "Password must be at least 6 characters")
    .max(20, "Password must be les than 20 characters")
    .matches(/(?=.*[0-9])/, "Password must contain a number"),
  fullName: yup
    .string()
    .required("Full name is required")
    .max(20, "Full name must be les than 20 characters")
    .matches(/^[a-zA-Z ]*$/, "Full name must contain only letters"),
});

export { LoginValidation, RegisterValidation };
