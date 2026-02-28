import pool from "../config/database.js";

export async function getPromociones(req, res) {
    try {
        const result = await pool.query('SELECT * FROM promociones');
        res.json(result.rows);
    } catch (error) {
        console.error('Error al obtener promociones', error);
        res.status(500).json({ error: 'Error al obtener promociones' });
    }
}

export async function getPromocion(req, res) {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM promociones WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Promocion no encontrada' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error al obtener la promocion', error);
        res.status(500).json({ error: 'Error al obtener la promocion' });
    }
}

export async function createPromocion(req, res) {
    const { titulo, descripcion, descuento_porcentaje, fecha_inicio, fecha_fin, activo } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO promociones (titulo, descripcion, descuento_porcentaje, fecha_inicio, fecha_fin, activo) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [titulo, descripcion, descuento_porcentaje, fecha_inicio, fecha_fin, activo]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error al crear la promocion', error);
        res.status(500).json({ error: 'Error al crear la promocion' });
    }
}

export async function updatePromocion(req, res) {
    const { id } = req.params;
    const { nombre, descripcion, precio, stock, imagen_url } = req.body;
    try {
        const result = await pool.query(
            'UPDATE promociones SET nombre = $1, descripcion = $2, precio = $3, stock = $4, imagen_url = $5 WHERE id = $6 RETURNING *',
            [nombre, descripcion, precio, stock, imagen_url, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Promocion no encontrada' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error al actualizar la promocion', error);
        res.status(500).json({ error: 'Error al actualizar la promocion' });
    }
}

export async function deletePromocion(req, res) {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM promociones WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Promocion no encontrada' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error al eliminar la promocion', error);
        res.status(500).json({ error: 'Error al eliminar la promocion' });
    }
}