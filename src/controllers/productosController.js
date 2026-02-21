<<<<<<< HEAD
import pool from "../config/database";      

export const getProductos = async (req, res) => {
=======
import pool from "../config/database.js";

export async function getProductos(req, res) {
>>>>>>> 02e8c3be900de3df971945dedbf37618dbb2c327
    try {
        const result = await pool.query('SELECT * FROM productos');
        res.json(result.rows);
    } catch (error) {
<<<<<<< HEAD
        console.error('Error al obtener los productos', error);
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
};
        
=======
        console.error('Error al obtener productos', error);
        res.status(500).json({ error: 'Error al obtener productos' });
    }
}
>>>>>>> 02e8c3be900de3df971945dedbf37618dbb2c327
