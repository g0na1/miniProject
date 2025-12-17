import * as yup from "yup";

export const userSchemaValidation = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Not a valid email format")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password cannot exceed 20 characters")
    .matches(/[0-9]+/, "Password must contain at least one number") 
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords don't match")
    .required("Confirm Password is required"),
});

export const loginSchemaValidation = yup.object().shape({
  email: yup
    .string()
    .email("Not a valid email format")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters") 
    .max(20, "Password cannot exceed 20 characters")
    .required("Password is required"),
});