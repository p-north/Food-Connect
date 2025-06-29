import pg from 'pg'
import dotenv from 'dotenv'


dotenv.config();

// create a postgresql client

// acessing client thru terminal (local database):
    // sudo -i -u postgres
    // psql
    // \c foodconnect
    // \dt 
    // \x auto
const client = new pg.Client({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    ssl: {
    rejectUnauthorized: false
  }

});

export default client;