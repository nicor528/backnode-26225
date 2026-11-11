import {
  registerUserService,
  loginUserService,
} from "../services/auth.services.js";

/**
 * Controlador para registrar un usuario (POST /api/auth/register)
 */
export async function registerUser(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Se requieren los campos email y password",
    });
  }

  try {
    const newUser = await registerUserService(email, password);
    return res.status(201).json({
      message: "Usuario registrado exitosamente",
      data: newUser,
    });
  } catch (error) {
    console.error("Error al registrar usuario:", error.code || error.message);

    if (error.code === "auth/email-already-in-use") {
      return res.status(409).json({
        message: "El correo electrónico ya está registrado",
      });
    }
    if (error.code === "auth/weak-password") {
      return res.status(400).json({
        message: "La contraseña debe tener al menos 6 caracteres",
      });
    }
    if (error.code === "auth/invalid-email") {
      return res.status(400).json({
        message: "El formato del correo electrónico no es válido",
      });
    }

    return res.status(500).json({
      message: "Error interno al registrar el usuario",
      error: error.message,
    });
  }
}

/**
 * Controlador para autenticar / iniciar sesión de un usuario (POST /api/auth/login)
 */
export async function loginUser(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Se requieren los campos email y password",
    });
  }

  try {
    const userData = await loginUserService(email, password);
    return res.status(200).json({
      message: "Usuario autenticado exitosamente",
      data: userData,
    });
  } catch (error) {
    console.error("Error en login:", error.code || error.message);

    if (
      error.code === "auth/invalid-credential" ||
      error.code === "auth/user-not-found" ||
      error.code === "auth/wrong-password" ||
      error.code === "auth/invalid-email"
    ) {
      return res.status(401).json({
        message: "Credenciales inválidas (email o contraseña incorrectos)",
      });
    }

    return res.status(500).json({
      message: "Error interno al iniciar sesión",
      error: error.message,
    });
  }
}
