import mariadb from "mariadb";

const pool = await mariadb.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'password',
    database: 'chatapp',
    connectionLimit: 5
});


export default pool