"use strict";

const mariaDB = require("./../../config/initializers/database");

exports.getUsuarios = async () => {
    let client;
    try {
        client = await mariaDB.getConnection();
        return await client.query("SELECT * FROM usuario");
    } catch (error) {
        await client.end();
        throw error;
    } finally {
        await client.end();
    }
};

exports.getUsuario = async (id) => {
    let client;
    try {
        client = await mariaDB.getConnection();
        return await client.query("SELECT * FROM usuario WHERE id = " + id);
    } catch (error) {
        await client.end();
        throw error;
    } finally {
        await client.end();
    }
};

exports.getUsuarioByEmail = async (email) => {
    let client;
    try {
        client = await mariaDB.getConnection();
        return await client.query('SELECT * FROM usuario WHERE email = "' + email + '"');
    } catch (error) {
        await client.end();
        throw error;
    } finally {
        await client.end();
    }
};
