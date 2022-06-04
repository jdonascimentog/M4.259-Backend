"use strict";

const Connection = require("mariadb/lib/connection");
const mariaDB = require("./../../config/initializers/database");

exports.getInfantesByAula = async (id) => {
    let client;
    try {
        client = await mariaDB.getConnection();
        return await client.query("SELECT * FROM infantes where id_aula = " + id);
    } catch (error) {
        await client.end();
        throw error;
    } finally {
        await client.end();
    }
};

exports.getInfantesByProgenitor = async (id) => {
    let client;
    try {
        client = await mariaDB.getConnection();
        return await client.query("SELECT * FROM infantes i, usuario_infante ui where ui.id_infante = i.id and id_usuario = " + id);
    } catch (error) {
        await client.end();
        throw error;
    } finally {
        await client.end();
    }
};

exports.getInfanteById = async (id) => {
    let client;
    let infante;
    try {
        client = await mariaDB.getConnection();
        infante = await client.query(
            "SELECT i.*, a.nombre nombre_aula, a.descripcion descripcion_aula, a.imagen imagen_aula FROM infantes i, aula a where i.id_aula = a.id_aula and i.id = " +
                id
        );
        infante.alimentacion = await client.query("SELECT * from alimentacion where id_infante = " + id + " order by fecha desc");
        infante.libro = await client.query("SELECT * from libro where id_infante = " + id);
        infante.libro.preguntas = await client.query(
            "SELECT p.* FROM preguntas p, tipo_pregunta tp where p.tipo = tp.id and id_libro = " + infante.libro.id
        );
        return infante;
    } catch (error) {
        await client.end();
        throw error;
    } finally {
        await client.end();
    }
};

exports.postInfante = async (infante) => {
    return mariaDB
        .getConnection()
        .then((conection) => {
            return conection.beginTransaction().then(() => {
                var infanteQuery = "INSERT INTO infantes (nombre, fecha_nac, id_centro, id_aula) VALUES (?,?,?,?)";
                var infanteDatos = [infante.nombre, infante.fecha_nac, infante.id_centro, infante.id_aula];
                return conection
                    .query(infanteQuery, infanteDatos)
                    .then((rows) => {
                        var id_infante = rows.insertId;
                        var libroQuery = "INSERT INTO libro (id_infante, nombre, descripcion, imagen, fecha_creacion) VALUES (?,?,?,?,?)";
                        var libroDatos = [id_infante, "Libro de " + infante.nombre, "Libro de seguimiento", "/default.png", new Date()];
                        return Connection.query(libroQuery, libroDatos)
                            .then(() => {
                                conection.commit();
                                return rows;
                            })
                            .catch(() => {
                                conection.rollback();
                            })
                            .finally(() => {
                                conection.end();
                                conection.release();
                            });
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

exports.putInfante = async (infante) => {
    return mariaDB
        .getConnection()
        .then((conection) => {
            return conection.beginTransaction().then(() => {
                var infanteQuery = "UPDATE infantes set nombre = ?, fecha_nac = ?, id_aula = ? where id = " + infante.id;
                var infanteDatos = [infante.nombre, infante.fecha_nac, infante.id_aula];
                return conection
                    .query(infanteQuery, infanteDatos)
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

exports.deleteInfante = async (id) => {
    let client;
    client = await mariaDB.getConnection();
    var id_libro = await client.query("SELECT * FROM libro where id_infante = " + id);
    return mariaDB
        .getConnection()
        .then((conection) => {
            return conection.beginTransaction().then(() => {
                var preguntasQuery = "DELETE preguntas where id_libro = " + id_libro;
                return conection
                    .query(preguntasQuery)
                    .then(() => {
                        var libroQuery = "DELETE libro where id_libro = " + id_libro;
                        return conection
                            .query(libroQuery)
                            .then(() => {
                                var usuarioQuery = "DELETE usuario_infante where id_infante = " + id;
                                return conection
                                    .query(usuarioQuery)
                                    .then(() => {
                                        var alimentacionQuery = "DELETE alimentacion where id_infante = " + id;
                                        return conection
                                            .query(alimentacionQuery)
                                            .then(() => {
                                                var infanteQuery = "DELETE infante where id = " + id;
                                                return conection
                                                    .query(infanteQuery)
                                                    .then((rows) => {
                                                        conection.commit();
                                                        return rows;
                                                    })
                                                    .catch(() => {
                                                        conection.rollback();
                                                        conection.release();
                                                    });
                                            })
                                            .catch(() => {
                                                conection.rollback();
                                                conection.release();
                                            });
                                    })
                                    .catch(() => {
                                        conection.rollback();
                                        conection.release();
                                    });
                            })
                            .catch(() => {
                                conection.rollback();
                                conection.release();
                            });
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
