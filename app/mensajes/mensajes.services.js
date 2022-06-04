"use strict";

const mariaDB = require("./../../config/initializers/database");

exports.getMensajesUser = async (id) => {
    let client;
    try {
        client = await mariaDB.getConnection();
        return await client.query(
            "SELECT m.*, d.login login_destino, r.login login_remitente FROM mensaje m, usuario d, usuario r where m.id_remitente = r.id and m.id_destino = d.id and (m.id_remitente = " +
                id +
                " or m.id_destino = " +
                id +
                ")"
        );
    } catch (error) {
        await client.end();
        throw error;
    } finally {
        await client.end();
    }
};

exports.getContactosUser = async (id, rol) => {
    let client;
    try {
        client = await mariaDB.getConnection();
        let contactos;
        if (rol == "admin") {
            contactos = await client.query(
                "SELECT u.id, u.login, u.email, u.telefono, '' password FROM usuario u, usuario_roles ur where ur.id_usuario = u.id and ur.rol = 'admin_centro'"
            );
        } else if (rol == "admin_centro") {
            centro = await client.query("SELECT id_centro FROM usuario_centro where id_usuario = " + id);
            contactos = await client.query(
                "SELECT u.id, u.login, u.email, u.telefono, '' password FROM usuario u, usuario_roles ur where ur.id_usuario = u.id and ur.rol = 'admin' " +
                    "union " +
                    "SELECT u.id, u.login, u.email, u.telefono, '' password FROM usuario u, usuario_centro uc where uc.id_usuario = u.id and uc.id_centro = " +
                    centro
            );
        } else if (rol == "educador") {
            centro = await client.query("SELECT id_centro FROM usuario_centro where id_usuario = " + id);
            aula = await client.query("SELECT id_aula from usuario_aula ua where ua.id_usuario = " + id);
            contactos = await client.query(
                "SELECT u.id, u.login, u.email, u.telefono, '' password FROM usuario u, usuario_roles ur, usuario_centro uc where uc.id_usuario = u.id and ur.id_usuario = u.id and ur.rol = 'admin_centro' and uc.id_centro = " +
                    centro +
                    " union " +
                    "SELECT u.id, u.login, u.email, u.telefono, '' password FROM usuario u, infantes i, usuario_infante ui WHERE u.id = ui.id_usuario and i.id = ui.id_infante and i.id_aula = " +
                    aula
            );
        } else {
            centro = await client.query("SELECT id_centro FROM usuario_centro where id_usuario = " + id);
            aula = await client.query("SELECT id_aula from infantes i, usuario_infante ui where ui.id_infante = i.id and ui.id_usuario = " + id);
            contactos = await client.query(
                "SELECT u.id, u.login, u.email, u.telefono, '' password FROM usuario u, usuario_roles ur, usuario_centro uc where uc.id_usuario = u.id and ur.id_usuario = u.id and ur.rol = 'admin_centro' and uc.id_centro = " +
                    centro +
                    " union " +
                    "SELECT u.id, u.login, u.email, u.telefono, '' password FROM usuario u, usuario_aula ua WHERE u.id = ua.id_usuario and ua.id_aula = " +
                    aula
            );
        }
        return contactos;
    } catch (error) {
        await client.end();
        throw error;
    } finally {
        await client.end();
    }
};

exports.postMensaje = async (mensaje) => {
    return mariaDB
        .getConnection()
        .then((conection) => {
            return conection.beginTransaction().then(() => {
                var mensajeQuery = "INSERT INTO mensaje (mensaje, id_remitente, id_destino, fecha_creacion) VALUES (?,?,?,?)";
                var mensajeDatos = [mensaje.mensaje, mensaje.id_remitente, mensaje.id_destino, mensaje.fecha];
                return conection
                    .query(mensajeQuery, mensajeDatos)
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

exports.deleteMensaje = async (id) => {
    return mariaDB
        .getConnection()
        .then((conection) => {
            return conection.beginTransaction().then(() => {
                var mensajeQuery = "DELETE mensaje where id = " + id;
                return conection
                    .query(mensajeQuery)
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
