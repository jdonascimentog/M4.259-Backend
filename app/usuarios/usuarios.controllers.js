"use strict";

const {
    getUsuarios,
    getUsuariosByRolCentro,
    getUsuario,
    getUsuariosByRol,
    getUsuarioRoles,
    getUsuarioByEmail,
    postUsuarioAdminCentro,
    postUsuarioEducador,
    postValidateUser,
} = require("./usuarios.services");

exports.getUsuarios = async (request, response, next) => {
    try {
        let usuarios = await getUsuarios();
        return response.status(200).json({ status: 200, data: usuarios, message: "Ok" });
    } catch (error) {
        return response.status(400).json({ status: 400, message: error.message });
    }
};

exports.getUsuario = async (request, response, next) => {
    try {
        let usuario = await getUsuario(request.params.id);
        return response.status(200).json({ status: 200, data: usuario, message: "Ok" });
    } catch (error) {
        return response.status(400).json({ status: 400, message: error.message });
    }
};

exports.getUsuariosByRol = async (request, response, next) => {
    try {
        let usuarios = await getUsuariosByRol(request.params.id);
        return response.status(200).json({ status: 200, data: usuarios, message: "Ok" });
    } catch (error) {
        return response.status(400).json({ status: 400, message: error.message });
    }
};

exports.getUsuariosByRolCentro = async (request, response, next) => {
    try {
        let usuarios = await getUsuariosByRolCentro(request.params.id, request.params.id_centro);
        return response.status(200).json({ status: 200, data: usuarios, message: "Ok" });
    } catch (error) {
        return response.status(400).json({ status: 400, message: error.message });
    }
};

exports.getUsuarioRoles = async (request, response, next) => {
    try {
        let usuarioRoles = await getUsuarioRoles(request.params.id);
        return response.status(200).json({ status: 200, data: usuarioRoles, message: "Ok" });
    } catch (error) {
        return response.status(400).json({ status: 400, message: error.message });
    }
};

exports.getUsuarioByEmail = async (request, response, next) => {
    try {
        let usuario = await getUsuarioByEmail(request.params.email);
        if (usuario.length > 0) {
            return response.status(200).json(usuario[0]);
        } else {
            return response.status(204).json({ status: 204, data: usuario, message: "No Content" });
        }
    } catch (error) {
        return response.status(400).json({ status: 400, message: error.message });
    }
};

exports.postUsuarioAdminCentro = async (request, response, next) => {
    try {
        let usuario = await postPregunta(request.body, request.params.id);
        return response.status(200).json({ status: 200, data: usuario, message: "Ok" });
    } catch (error) {
        return response.status(400).json({ status: 400, message: error.message });
    }
};

exports.postUsuarioEducador = async (request, response, next) => {
    try {
        let usuario = await postPregunta(request.body, request.params.id, request.params.id_aula);
        return response.status(200).json({ status: 200, data: usuario, message: "Ok" });
    } catch (error) {
        return response.status(400).json({ status: 400, message: error.message });
    }
};

exports.postValidateUser = async (request, response, next) => {
    try {
        let usuario = await postPregunta(request.body);
        return response.status(200).json({ status: 200, data: usuario > 0 ? true : false, message: "Ok" });
    } catch (error) {
        return response.status(400).json({ status: 400, message: error.message });
    }
};
