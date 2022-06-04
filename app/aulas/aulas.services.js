"use strict";

const mariaDB = require("./../../config/initializers/database");

exports.getAulas = async () => {
    let client;
    try {
        client = await mariaDB.getConnection();
        return await client.query("SELECT a.*, c.* FROM aula a, aula c where a.id_centro = c.id");
    } catch (error) {
        await client.end();
        throw error;
    } finally {
        await client.end();
    }
};

exports.getAulasByCentro = async (id) => {
    let client;
    try {
        client = await mariaDB.getConnection();
        return await client.query("SELECT * FROM aula a where id_centro = " + id);
    } catch (error) {
        await client.end();
        throw error;
    } finally {
        await client.end();
    }
};

exports.getAulasById = async (id) => {
    let client;
    try {
        client = await mariaDB.getConnection();
        return await client.query("SELECT * FROM aula a where id = " + id);
    } catch (error) {
        await client.end();
        throw error;
    } finally {
        await client.end();
    }
};

exports.putAula = async (aula) => {
    return mariaDB
        .getConnection()
        .then((conection) => {
            return conection.beginTransaction().then(() => {
                var aulaQuery = "UPDATE aula set nombre = ?, descripcion = ?, imagen = ? where id = " + aula.id;
                var aulaDatos = [aula.nombre, aula.descripcion, aula.imagen];
                return conection
                    .query(aulaQuery, aulaDatos)
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

exports.postAula = async (aula) => {
    return mariaDB
        .getConnection()
        .then((conection) => {
            return conection.beginTransaction().then(() => {
                var aulaQuery = "INSERT INTO aula (id_centro, nombre, descripcion, imagen) VALUES (?,?,?,?)";
                var aulaDatos = [aula.id_centro, aula.nombre, aula.descripcion, aula.imagen];
                return conection
                    .query(aulaQuery, aulaDatos)
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

exports.deleteAula = async (id) => {
    return mariaDB
        .getConnection()
        .then((conection) => {
            return conection.beginTransaction().then(() => {
                var aulaQuery = "DELETE aula where id = " + id;
                return conection
                    .query(aulaQuery)
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
