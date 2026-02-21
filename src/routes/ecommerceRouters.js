import { Router } from "express";
import { getProductos } from "../controllers/productosController.js";

const router = Router();

router.get("/productos", getProductos);

export default router;
