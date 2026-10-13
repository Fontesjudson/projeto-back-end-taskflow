const { Pool } = require ('pg');

const pool = new Pool ({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnaudhorized: false },
});

module.exports =  {pool} ;