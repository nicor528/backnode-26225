import {
  registrarUsuario,
  iniciarSesionUsuario,
} from "../models/auth.models.js";

export const registerUserService = async (email, password) => {
  return await registrarUsuario(email, password);
};

export const loginUserService = async (email, password) => {
  return await iniciarSesionUsuario(email, password);
};
