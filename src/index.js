import "./loadEnv.js";
import express from "express";
import { conectar } from "./config/database.js";
import ecommerceRoutes from "./routes/ecommerceRouters.js";
import morgan from "morgan";
import cors from "cors";
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger.js';

const app = express();

// Middleware
app.use(cors()); // Permitir peticiones desde cualquier origen (CORS)
app.use(morgan("dev"));
app.use(express.json());

// Documentación de Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.get('/', (req, res) => res.send('API Ecommerce - Servidor Funcionando'));
app.use('/api', ecommerceRoutes);

// Database and Server Startup
async function startServer() {
    await conectar();
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
}

startServer();
