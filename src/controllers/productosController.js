import pool from "../config/database.js";

export async function getProductos(req, res) {
    try {
        const result = await pool.query('SELECT * FROM productos');
        res.json(result.rows);
    } catch (error) {
<<<<<<< HEAD
        console.error('Error al obtener productos', error);
        res.status(500).json({ error: 'Error al obtener productos' });
=======

        console.error('Error al obtener los productos', error);
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
};

export async function getProducto(req, res) {
    try {
        const result = await pool.query('SELECT * FROM productos WHERE id = $1', [req.params.id]);
        res.json(result.rows);
    } catch (error) {
        console.error('Error al obtener el producto', error);
        res.status(500).json({ error: 'Error al obtener el producto' });
    }
}

export async function createProducto(req, res) {
    try {
        const result = await pool.query('INSERT INTO productos (nombre, descripcion, precio, imagen_url) VALUES ($1, $2, $3, $4) RETURNING *', [req.body.nombre, req.body.descripcion, req.body.precio, req.body.imagen_url]);
        res.json(result.rows);
    } catch (error) {
        console.error('Error al crear el producto', error);
        res.status(500).json({ error: 'Error al crear el producto' });
>>>>>>> 1bbfdd689f3aabde76ff958b201f5cf61e9554a3
    }
}