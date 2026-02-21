import  { Router } from "express";
impor   { getProductos } from "../controllers/productosController";  

const router = Router();

router.get("/productos", getProductos);

export default router;
    