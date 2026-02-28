import { Router } from "express";
import { createProducto, getProducto, getProductos } from "../controllers/productosController.js";
import { registrar, login, getPerfil } from "../controllers/authController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { createPromocion, deletePromocion, getPromocion, getPromociones, updatePromocion } from "../controllers/promocionesController.js";

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Usuario:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         nombre:
 *           type: string
 *         email:
 *           type: string
 *     Producto:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         nombre:
 *           type: string
 *         descripcion:
 *           type: string
 *         precio:
 *           type: number
 *         stock:
 *           type: integer
 *         imagen_url:
 *           type: string
 *     Promocion:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         titulo:
 *           type: string
 *         descripcion:
 *           type: string
 *         descuento_porcentaje:
 *           type: integer
 *         fecha_inicio:
 *           type: string
 *           format: date
 *         fecha_fin:
 *           type: string
 *           format: date
 *         activo:
 *           type: boolean
 */

// --- Rutas de Autenticación ---

/**
 * @swagger
 * /api/auth/registro:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     tags: [Autenticación]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [nombre, email, password]
 *             properties:
 *               nombre: { type: string }
 *               email: { type: string }
 *               password: { type: string }
 *     responses:
 *       201:
 *         description: Usuario registrado exitosamente
 */
router.post("/auth/registro", registrar);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Iniciar sesión
 *     tags: [Autenticación]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email: { type: string }
 *               password: { type: string }
 *     responses:
 *       200:
 *         description: Login exitoso y retorno del token JWT
 */
router.post("/auth/login", login);

/**
 * @swagger
 * /api/auth/perfil:
 *   get:
 *     summary: Obtener el perfil del usuario logueado
 *     tags: [Autenticación]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Datos del usuario
 */
router.get("/auth/perfil", authMiddleware, getPerfil);

// --- Rutas de Productos ---

/**
 * @swagger
 * /api/productos:
 *   get:
 *     summary: Listar todos los productos
 *     tags: [Productos]
 *     responses:
 *       200:
 *         description: Lista de productos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Producto'
 */
router.get("/productos", getProductos);

/**
 * @swagger
 * /api/productos/{id}:
 *   get:
 *     summary: Obtener detalle de un producto
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Detalle del producto
 */
router.get("/productos/:id", getProducto);

/**
 * @swagger
 * /api/productos:
 *   post:
 *     summary: Crear un nuevo producto (Requiere Token)
 *     tags: [Productos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Producto'
 *     responses:
 *       201:
 *         description: Producto creado
 */
router.post("/productos", authMiddleware, createProducto);

// --- Rutas de Promociones ---

/**
 * @swagger
 * /api/promociones:
 *   get:
 *     summary: Listar todas las promociones
 *     tags: [Promociones]
 *     responses:
 *       200:
 *         description: Lista de promociones
 */
router.get("/promociones", getPromociones);

/**
 * @swagger
 * /api/promociones:
 *   post:
 *     summary: Crear una promoción (Requiere Token)
 *     tags: [Promociones]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Promocion'
 *     responses:
 *       201:
 *         description: Promoción creada
 */
router.post("/promociones", authMiddleware, createPromocion);

/**
 * @swagger
 * /api/promociones/{id}:
 *   put:
 *     summary: Actualizar una promoción (Requiere Token)
 *     tags: [Promociones]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Promocion'
 *     responses:
 *       200:
 *         description: Promoción actualizada
 */
router.put("/promociones/:id", authMiddleware, updatePromocion);

/**
 * @swagger
 * /api/promociones/{id}:
 *   delete:
 *     summary: Eliminar una promoción (Requiere Token)
 *     tags: [Promociones]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Promoción eliminada
 */
router.delete("/promociones/:id", authMiddleware, deletePromocion);

export default router;
