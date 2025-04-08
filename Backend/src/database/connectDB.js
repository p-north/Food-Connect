import pg from 'pg'

// create a postgresql client

// acessing client thru terminal:
    // sudo -i -u postgres
    // psql
    // \c foodconnect
    // \dt 
    // \x auto
const client = new pg.Client({
    user: 'admin',
    password: 'fd123',
    host: 'localhost',
    database: 'foodconnect',
    port: 5432,

});

export default client;