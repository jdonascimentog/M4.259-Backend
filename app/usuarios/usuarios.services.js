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

exports.getUsuariosByRol = async (id) => {
    let client;
    try {
        client = await mariaDB.getConnection();
        return await client.query("SELECT u.* FROM usuario u, usuario_roles ur where u.id = ur.id_usuario and ur.id_rol = " + id);
    } catch (error) {
        await client.end();
        throw error;
    } finally {
        await client.end();
    }
};

exports.getUsuariosByRolCentro = async (id, id_centro) => {
    let client;
    try {
        client = await mariaDB.getConnection();
        return await client.query(
            "SELECT u.* FROM usuario u, usuario_roles ur, usuario_centro uc where u.id = ur.id_usuario and u.id = uc.id_usuario and ur.id_rol = " +
                id +
                " and uc.id_centro = " +
                id_centro
        );
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

exports.getUsuarioRoles = async (id) => {
    let client;
    try {
        client = await mariaDB.getConnection();
        return await client.query("SELECT ur.id_rol, r.rol FROM usuario_roles ur, roles r WHERE ur.id_rol = r.id and ur.id_usuario = " + id);
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

exports.postValidateUser = async (usuario) => {
    let client;
    try {
        client = await mariaDB.getConnection();
        return await client.query("SELECT count(*) FROM usuario WHERE id = " + usuario.id + ' and password = "' + usuario.password + '"');
    } catch (error) {
        await client.end();
        throw error;
    } finally {
        await client.end();
    }
};

exports.postUsuarioAdminCentro = async (usuario, id_centro) => {
    let client;
    try {
        client = await mariaDB.getConnection();
        let rol = await client.query('SELECT id FROM roles WHERE rol = "admin_centro"');
        return mariaDB
            .getConnection()
            .then((conection) => {
                return conection.beginTransaction().then(() => {
                    var usuarioQuery = "INSERT INTO usuario (login, password, email, telefono) VALUES (?,?,?,?)";
                    var usuarioDatos = [usuario.login, usuario.password, usuario.email, usuario.telefono];
                    return conection
                        .query(usuarioQuery, usuarioDatos)
                        .then((rows) => {
                            var id_usuario = rows.insertId;
                            var usuarioRolQuery = "INSERT INTO usuario_roles (id_usuario, id_roles) VALUES (?,?)";
                            var usuarioRolDatos = [id_usuario, rol];
                            return Connection.query(usuarioRolQuery, usuarioRolDatos)
                                .then(() => {
                                    var usuarioCentroQuery = "INSERT INTO usuario_centro (id_usuario, id_centro) VALUES (?,?)";
                                    var usuarioCentroDatos = [id_usuario, id_centro];
                                    return conection
                                        .query(usuarioCentroQuery, usuarioCentroDatos)
                                        .then(() => {
                                            conection.commit();
                                            return rows;
                                        })
                                        .catch(() => {
                                            conection.rollback();
                                            conection.release();
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
    } catch (error) {
        await client.end();
        throw error;
    } finally {
        await client.end();
    }
};

exports.postUsuarioEducador = async (usuario, id_centro, id_aula) => {
    let client;
    try {
        client = await mariaDB.getConnection();
        let rol = await client.query('SELECT id FROM roles WHERE rol = "educador"');
        return mariaDB
            .getConnection()
            .then((conection) => {
                return conection.beginTransaction().then(() => {
                    var usuarioQuery = "INSERT INTO usuario (login, password, email, telefono) VALUES (?,?,?,?)";
                    var usuarioDatos = [usuario.login, usuario.password, usuario.email, usuario.telefono];
                    return conection
                        .query(usuarioQuery, usuarioDatos)
                        .then((rows) => {
                            var id_usuario = rows.insertId;
                            var usuarioRolQuery = "INSERT INTO usuario_roles (id_usuario, id_roles) VALUES (?,?)";
                            var usuarioRolDatos = [id_usuario, rol];
                            return Connection.query(usuarioRolQuery, usuarioRolDatos)
                                .then(() => {
                                    var usuarioCentroQuery = "INSERT INTO usuario_centro (id_usuario, id_centro) VALUES (?,?)";
                                    var usuarioCentroDatos = [id_usuario, id_centro];
                                    return conection
                                        .query(usuarioCentroQuery, usuarioCentroDatos)
                                        .then(() => {
                                            var usuarioAulaQuery = "INSERT INTO usuario_aula (id_usuario, id_aula) VALUES (?,?)";
                                            var usuarioAulaDatos = [id_usuario, id_aula];
                                            return conection
                                                .query(usuarioAulaQuery, usuarioAulaDatos)
                                                .then(() => {
                                                    conection.commit();
                                                    return rows;
                                                })
                                                .catch(() => {
                                                    conection.rollback();
                                                    conection.release();
                                                })
                                                .finally(() => {
                                                    conection.end();
                                                    conection.release();
                                                });
                                        })
                                        .catch(() => {
                                            conection.rollback();
                                            conection.release();
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
    } catch (error) {
        await client.end();
        throw error;
    } finally {
        await client.end();
    }
};
