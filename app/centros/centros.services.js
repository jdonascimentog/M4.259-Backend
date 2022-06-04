"use strict";

const mariaDB = require("./../../config/initializers/database");

exports.getCentros = async () => {
    let client;
    try {
        client = await mariaDB.getConnection();
        return await client.query("SELECT * FROM centro");
    } catch (error) {
        await client.end();
        throw error;
    } finally {
        await client.end();
    }
};

exports.getCentroById = async (id) => {
    let client;
    try {
        client = await mariaDB.getConnection();
        return await client.query("SELECT * FROM centro where id = " + id);
    } catch (error) {
        await client.end();
        throw error;
    } finally {
        await client.end();
    }
};

exports.putCentro = async (centro) => {
    return mariaDB
        .getConnection()
        .then((conection) => {
            return conection.beginTransaction().then(() => {
                var centroQuery = "UPDATE centro set nombre = ?, descripcion = ?, direccion = ?, telefono = ?, imagen = ? where id = " + centro.id;
                var centroDatos = [centro.nombre, centro.descripcion, centro.direccion, centro.telefono, centro.imagen];
                return conection
                    .query(centroQuery, centroDatos)
                    .then((rows) => {
                        conection.commit();
                        return rows;
                    })
                    .catch(() => {
                        conection.rollback();
                        conection.release();
                    });
            });
        })
        .catch(() => {
            throw error;
        });
};

exports.postCentro = async (centro) => {
    return mariaDB
        .getConnection()
        .then((conection) => {
            return conection.beginTransaction().then(() => {
                var centroQuery = "INSERT INTO centro (nombre, descripcion, direccion, telefono, imagen) VALUES (?,?,?,?,?)";
                var centroDatos = [centro.nombre, centro.descripcion, centro.direccion, centro.telefono, centro.imagen];
                return conection
                    .query(centroQuery, centroDatos)
                    .then((rows) => {
                        conection.commit();
                        return rows;
                    })
                    .catch(() => {
                        conection.rollback();
                        conection.release();
                    });
            });
        })
        .catch(() => {
            throw error;
        });
};

exports.deleteCentro = async (id) => {
    return mariaDB
        .getConnection()
        .then((conection) => {
            return conection.beginTransaction().then(() => {
                var centroQuery = "DELETE centro where id = " + id;
                return conection
                    .query(centroQuery)
                    .then((rows) => {
                        conection.commit();
                        return rows;
                    })
                    .catch(() => {
                        conection.rollback();
                        conection.release();
                    });
            });
        })
        .catch(() => {
            throw error;
        });
};
