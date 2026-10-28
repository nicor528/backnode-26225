import express from "express";
import { getAllProducts, getProduct } from "../controllers/products.controllers.js";

const routes = express.Router();

routes.get("/products", getAllProducts);

routes.get("/products/:id", getProduct);

export default routes;