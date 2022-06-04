"use strict";

const mariaDB = require("./../../config/initializers/database");

exports.getEventos = async (id, rol) => {
    let client;
    try {
        client = await mariaDB.getConnection();
        let eventos;
        if (rol == "admin_centro") {
            centro = await client.query("SELECT id_centro FROM usuario_centro where id_usuario = " + id);
            eventos = await client.query("SELECT e.* from evento e, agenda a where a.id = e.id_agenda and a.id_centro = " + centro);
        } else if (rol == "educador") {
            centro = await client.query("SELECT id_centro FROM usuario_centro where id_usuario = " + id);
            aula = await client.query("SELECT id_aula from usuario_aula ua where ua.id_usuario = " + id);
            eventos = await client.query(
                "SELECT e.* from evento e, agenda a where a.id = e.id_agenda and (a.id_aula = 0 or a.id_aula = " + aula + ")"
            );
        } else {
            centro = await client.query("SELECT id_centro FROM usuario_centro where id_usuario = " + id);
            aula = await client.query("SELECT id_aula from infantes i, usuario_infante ui where ui.id_infante = i.id and ui.id_usuario = " + id);
            eventos = await client.query(
                "SELECT e.* from evento e, agenda a where a.id = e.id_agenda and (a.id_aula = 0 or a.id_aula = " + aula + ")"
            );
        }
        return eventos;
    } catch (error) {
        await client.end();
        throw error;
    } finally {
        await client.end();
    }
};

exports.postEvento = async (evento) => {
    return mariaDB
        .getConnection()
        .then((conection) => {
            return conection.beginTransaction().then(() => {
                var eventoQuery = "INSERT INTO evento (id_agenda, titulo, tipo) VALUES (?,?,?)";
                var eventoDatos = [evento.id_agenda, evento.titulo, evento.tipo];
                return conection
                    .query(eventoQuery, eventoDatos)
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

exports.postAgendaCentro = async (agenda) => {
    return mariaDB
        .getConnection()
        .then((conection) => {
            return conection.beginTransaction().then(() => {
                var agendaQuery = "INSERT INTO agenda (id_centro, id_aula, titulo, imagen) VALUES (?,?,?,?)";
                var agendaDatos = [agenda.id_centro, 0, agenda.titulo, agenda.imagen];
                return conection
                    .query(agendaQuery, agendaDatos)
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

exports.postAgendaAula = async (agenda) => {
    return mariaDB
        .getConnection()
        .then((conection) => {
            return conection.beginTransaction().then(() => {
                var agendaQuery = "INSERT INTO agenda (id_centro, id_aula, titulo, imagen) VALUES (?,?,?,?)";
                var agendaDatos = [agenda.id_centro, agenda.id_aula, agenda.titulo, agenda.imagen];
                return conection
                    .query(agendaQuery, agendaDatos)
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

exports.putAgenda = async (agenda) => {
    return mariaDB
        .getConnection()
        .then((conection) => {
            return conection.beginTransaction().then(() => {
                var agendaQuery = "UPDATE agenda SET titulo = ?, imagen = ? WHERE id = " + agenda.id;
                var agendaDatos = [agenda.titulo, agenda.imagen];
                return conection
                    .query(agendaQuery, agendaDatos)
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

exports.deleteEvento = async (id) => {
    return mariaDB
        .getConnection()
        .then((conection) => {
            return conection.beginTransaction().then(() => {
                var agendaQuery = "DELETE evento WHERE id = " + id;
                return conection
                    .query(agendaQuery)
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

exports.deleteAgenda = async (id) => {
    return mariaDB
        .getConnection()
        .then((conection) => {
            return conection.beginTransaction().then(() => {
                var eventosQuery = "DELETE evento WHERE id_agenda = " + id;
                return conection
                    .query(eventosQuery)
                    .then(() => {
                        var agendaQuery = "DELETE agenda WHERE id = " + id;
                        return conection
                            .query(agendaQuery)
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
