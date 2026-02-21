import pool from "../config/database.js";

export async function getProductos(req, res) {
    try {
        const result = await pool.query('SELECT * FROM productos');
        res.json(result.rows);
    } catch (error) {
        console.error('Error al obtener productos', error);
        res.status(500).json({ error: 'Error al obtener productos' });
    }
}

export async function getProducto(req, res) {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM productos WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error al obtener el producto', error);
        res.status(500).json({ error: 'Error al obtener el producto' });
    }
}

export async function createProducto(req, res) {
    const { nombre, descripcion, precio, imagen_url } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO productos (nombre, descripcion, precio, imagen_url) VALUES ($1, $2, $3, $4) RETURNING *',
            [nombre, descripcion, precio, imagen_url]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error al crear el producto', error);
        res.status(500).json({ error: 'Error al crear el producto' });
    }
}