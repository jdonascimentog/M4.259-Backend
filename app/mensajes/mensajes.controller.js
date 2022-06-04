"use strict";

const { getMensajesUser, getContactosUser, postMensaje, deleteMensaje } = require("./mensajes.services");

exports.getMensajesUser = async (request, response, next) => {
    try {
        let mensajes = await getMensajesUser(request.params.id);
        return response.status(200).json({ status: 200, data: mensajes, message: "Ok" });
    } catch (error) {
        return response.status(400).json({ status: 400, message: error.message });
    }
};

exports.getContactosUser = async (request, response, next) => {
    try {
        let contactos = await getContactosUser(request.params.id, request.params.rol);
        return response.status(200).json({ status: 200, data: contactos, message: "Ok" });
    } catch (error) {
        return response.status(400).json({ status: 400, message: error.message });
    }
};

exports.postMensaje = async (request, response, next) => {
    try {
        let mensaje = await postMensaje(request.body);
        return response.status(200).json({ status: 200, data: mensaje, message: "Ok" });
    } catch (error) {
        return response.status(400).json({ status: 400, message: error.message });
    }
};

exports.deleteMensaje = async (request, response, next) => {
    try {
        let mensaje = await deleteAula(request.params.id);
        return response.status(200).json({ status: 200, data: mensaje, message: "Ok" });
    } catch (error) {
        return response.status(400).json({ status: 400, message: error.message });
    }
};
