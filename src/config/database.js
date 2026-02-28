import pg from 'pg';

const pool = new pg.Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT) || 5432,
    ssl: {
        rejectUnauthorized: false
    },
    connectionTimeoutMillis: 5000,
});

export async function conectar() {
    try {
        console.log(`Intentando conectar a la base de datos en: ${process.env.DB_HOST}`);
        const client = await pool.connect();
        console.log('Conectado a la base de datos exitosamente');
        client.release();
    } catch (error) {
        console.error('Error al conectar a la base de datos:');
        console.error('- Mensaje:', error.message);
        console.error('- Código:', error.code);
        console.error('- Stack:', error.stack);
    }
}


export default pool;