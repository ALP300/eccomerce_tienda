import { Router } from "express";
import { createProducto, getProducto, getProductos } from "../controllers/productosController.js";
import { registrar, login, getPerfil } from "../controllers/authController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { createPromocion, deletePromocion, getPromocion, getPromociones, updatePromocion } from "../controllers/promocionesController.js";

const router = Router();

// Rutas Públicas de Productos
router.get("/productos", getProductos);
router.get("/productos/:id", getProducto);

// Rutas de Autenticación
router.post("/auth/registro", registrar);
router.post("/auth/login", login);

// Rutas Protegidas
router.get("/auth/perfil", authMiddleware, getPerfil);
router.post("/productos", authMiddleware, createProducto); // Solo usuarios logueados pueden crear productos
router.post("/promociones", authMiddleware, createPromocion);
router.put("/promociones/:id", authMiddleware, updatePromocion);
router.delete("/promociones/:id", authMiddleware, deletePromocion);

//rutas Promociones
router.get("/promociones", getPromociones);
router.get("/promociones/:id", getPromocion);


export default router;
