"use strict";

const { getEventos, postAgendaAula, postAgendaCentro, postEvento, putAgenda, deleteAgenda, deleteEvento } = require("./agenda.services");

exports.getEventos = async (request, response, next) => {
    try {
        let eventos = await getEventos(request.param.id, request.param.rol);
        return response.status(200).json({ status: 200, data: eventos, message: "Ok" });
    } catch (error) {
        return response.status(400).json({ status: 400, message: error.message });
    }
};

exports.postAgendaAula = async (request, response, next) => {
    try {
        let agenda = await postAgendaAula(request.body);
        return response.status(200).json({ status: 200, data: agenda, message: "Ok" });
    } catch (error) {
        return response.status(400).json({ status: 400, message: error.message });
    }
};

exports.postAgendaCentro = async (request, response, next) => {
    try {
        let agenda = await postAgendaCentro(request.body);
        return response.status(200).json({ status: 200, data: agenda, message: "Ok" });
    } catch (error) {
        return response.status(400).json({ status: 400, message: error.message });
    }
};

exports.postEvento = async (request, response, next) => {
    try {
        let agenda = await postEvento(request.body);
        return response.status(200).json({ status: 200, data: agenda, message: "Ok" });
    } catch (error) {
        return response.status(400).json({ status: 400, message: error.message });
    }
};

exports.putAgenda = async (request, response, next) => {
    try {
        let agenda = await putAgenda(request.body);
        return response.status(200).json({ status: 200, data: agenda, message: "Ok" });
    } catch (error) {
        return response.status(400).json({ status: 400, message: error.message });
    }
};

exports.deleteAgenda = async (request, response, next) => {
    try {
        let agenda = await deleteAgenda(request.params.id);
        return response.status(200).json({ status: 200, data: agenda, message: "Ok" });
    } catch (error) {
        return response.status(400).json({ status: 400, message: error.message });
    }
};

exports.deleteEvento = async (request, response, next) => {
    try {
        let agenda = await deleteEvento(request.params.id);
        return response.status(200).json({ status: 200, data: agenda, message: "Ok" });
    } catch (error) {
        return response.status(400).json({ status: 400, message: error.message });
    }
};
