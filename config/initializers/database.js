"use strict";

const mariaDb = require("mariadb");

const conexion = mariaDb.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "kindergarten",
    connectionLimit: 5,
    multipleStatements: true,
});

module.exports = conexion;
