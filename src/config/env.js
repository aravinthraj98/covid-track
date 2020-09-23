import 'dotenv/config';

const PORT = process.env.PORT || 8080;
const db_connection = process.env.db_connection;

export { PORT, db_connection };
