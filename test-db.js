import pg from 'pg';

const { Pool } = pg;

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    ssl: true
};

console.log('Testing connection with config:', { ...config, password: '****' });

const pool = new Pool(config);

try {
    const client = await pool.connect();
    console.log('Successfully connected!');
    const res = await client.query('SELECT NOW()');
    console.log('Query result:', res.rows[0]);
    client.release();
} catch (err) {
    console.error('Connection error details:');
    console.error('Message:', err.message);
    console.error('Code:', err.code);
    console.error('Stack:', err.stack);
    if (err.originalError) console.error('Original Error:', err.originalError);
} finally {
    await pool.end();
}
