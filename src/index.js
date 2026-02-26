import express from "express";
import { conectar } from "./config/database.js";
import ecommerceRoutes from "./routes/ecommerceRouters.js";
import morgan from "morgan";

const app = express();

// Middleware
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.get('/', (req, res) => res.send('API Ecommerce - Servidor Funcionando'));
app.use('/api', ecommerceRoutes);

// Database and Server Startup
async function startServer() {
    await conectar();
    app.listen(3000, () => {
        console.log('Servidor corriendo en el puerto 3000');
    });
}

startServer();
