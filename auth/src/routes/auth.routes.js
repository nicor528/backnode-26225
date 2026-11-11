import express from "express";
import { loginUser, registerUser } from "../controllers/auth.controllers.js";

const routes = express.Router();

// Endpoint para iniciar sesión (autenticar usuario)
routes.post("/login", loginUser);

// Endpoint para registrar nuevo usuario en Firebase Auth
routes.post("/register", registerUser);

export default routes;
