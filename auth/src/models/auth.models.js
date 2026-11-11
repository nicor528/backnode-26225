import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../data/data.js";

/**
 * Registra un nuevo usuario en Firebase Authentication usando email y contraseña
 */
export const registrarUsuario = async (email, password) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  const user = userCredential.user;
  const token = await user.getIdToken();

  return {
    uid: user.uid,
    email: user.email,
    token,
  };
};

/**
 * Inicia sesión de un usuario existente en Firebase Authentication
 */
export const iniciarSesionUsuario = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  const user = userCredential.user;
  const token = await user.getIdToken();

  return {
    uid: user.uid,
    email: user.email,
    token,
  };
};
