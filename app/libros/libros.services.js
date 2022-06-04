"use strict";

const Connection = require("mariadb/lib/connection");
const mariaDB = require("./../../config/initializers/database");

exports.postPregunta = async (id_libro, pregunta) => {
    return mariaDB
        .getConnection()
        .then((conection) => {
            return conection.beginTransaction().then(() => {
                var libroQuery = "INSERT INTO preguntas (id_libro, pregunta, tipo) VALUES (?,?,?)";
                var libroDatos = [id_libro, pregunta.pregunta, pregunta.tipo];
                return conection
                    .query(libroQuery, libroDatos)
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

exports.postLibro = async (infante) => {
    return mariaDB
        .getConnection()
        .then((conection) => {
            return conection.beginTransaction().then(() => {
                var libroQuery = "INSERT INTO libro (id_infante, nombre, descripcion, imagen, fecha_creacion) VALUES (?,?,?,?,?)";
                var libroDatos = [infante.id, "Libro de " + infante.nombre, "Libro de seguimiento", "/default.png", new Date()];
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
            });
        })
        .catch(() => {
            throw error;
        });
};

exports.putPregunta = async (pregunta) => {
    return mariaDB
        .getConnection()
        .then((conection) => {
            return conection.beginTransaction().then(() => {
                var libroQuery = "UPDATE preguntas SET pregunta = ?, tipo = ? WHERE id = " + pregunta.id;
                var libroDatos = [pregunta.pregunta, pregunta.tipo];
                return conection
                    .query(libroQuery, libroDatos)
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

exports.putPreguntaRespuesta = async (pregunta) => {
    return mariaDB
        .getConnection()
        .then((conection) => {
            return conection.beginTransaction().then(() => {
                var libroQuery = "UPDATE preguntas SET respuesta = ?, fecha_respuesta = ? WHERE id = " + pregunta.id;
                var libroDatos = [pregunta.respuesta, new Date()];
                return conection
                    .query(libroQuery, libroDatos)
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

exports.deletePregunta = async (id) => {
    return mariaDB
        .getConnection()
        .then((conection) => {
            return conection.beginTransaction().then(() => {
                var libroQuery = "DELETE preguntas WHERE id = " + id;
                return conection
                    .query(libroQuery)
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

exports.deleteLibro = async (id) => {
    return mariaDB
        .getConnection()
        .then((conection) => {
            return conection.beginTransaction().then(() => {
                var preguntasQuery = "DELETE preguntas WHERE id_libro = " + id;
                return conection
                    .query(preguntasQuery)
                    .then(() => {
                        var libroQuery = "DELETE libro where id = " + id;
                        return conection
                            .query(libroQuery)
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
            });
        })
        .catch(() => {
            throw error;
        });
};
