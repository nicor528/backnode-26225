import express from "express";
import { getAllProducts, getProduct } from "../controllers/products.controllers.js";
import { authentication } from "../middlewares/authentication.js";

const routes = express.Router();

routes.get("/products", getAllProducts);

routes.get("/products/:id", authentication, getProduct);

export default routes;