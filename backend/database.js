const { response } = require("express"); 
const { Pool } = require("pg");


const pool = new Pool({
    user: "postgres",
    password: "postgres",
    host: "localhost",
    port: 5432,
    database: "sports_management_system",
});

// const createTblQry = `CREATE TABLE equipment (
//     equip_id serial PRIMARY KEY,
//     equip_name VARCHAR ( 50 ) UNIQUE NOT NULL,
//     equip_quantity VARCHAR ( 50 ) UNIQUE NOT NULL);`;

// pool
//     .query(createTblQry)
//     .then((Response) => {
//         console.log("Table Created");
//         console.log(response);
//     })
//     .catch((err) => {
//         console.log(err);
//     });

module.exports = pool;