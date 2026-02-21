import express from "express";
import { conectar } from "./config/database.js";
const app = express();

app.listen(3000, () => {
    console.log('Servidor corriendo en el puerto 3000');
});

conectar()
