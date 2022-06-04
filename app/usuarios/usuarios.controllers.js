"use strict";

const { getUsuarios } = require("./usuarios.services");
const { getUsuario } = require("./usuarios.services");
const { getUsuarioByEmail } = require("./usuarios.services");

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
