"use strict";

const { getInfanteById, getInfantesByAula, getInfantesByProgenitor, postInfante, putInfante, deleteInfante } = require("./infantes.services");

exports.getInfanteById = async (request, response, next) => {
    try {
        let infante = await getInfanteById(request.params.id);
        return response.status(200).json({ status: 200, data: infante, message: "Ok" });
    } catch (error) {
        return response.status(400).json({ status: 400, message: error.message });
    }
};

exports.getInfantesByAula = async (request, response, next) => {
    try {
        let infantes = await getInfantesByAula(request.params.id);
        return response.status(200).json({ status: 200, data: infantes, message: "Ok" });
    } catch (error) {
        return response.status(400).json({ status: 400, message: error.message });
    }
};

exports.getInfantesByProgenitor = async (request, response, next) => {
    try {
        let infantes = await getInfantesByProgenitor(request.params.id);
        return response.status(200).json({ status: 200, data: infantes, message: "Ok" });
    } catch (error) {
        return response.status(400).json({ status: 400, message: error.message });
    }
};

exports.putInfante = async (request, response, next) => {
    try {
        let infante = await putInfante(request.body);
        return response.status(200).json({ status: 200, data: infante, message: "Ok" });
    } catch (error) {
        return response.status(400).json({ status: 400, message: error.message });
    }
};

exports.postInfante = async (request, response, next) => {
    try {
        let infante = await postInfante(request.body);
        return response.status(200).json({ status: 200, data: infante, message: "Ok" });
    } catch (error) {
        return response.status(400).json({ status: 400, message: error.message });
    }
};

exports.deleteInfante = async (request, response, next) => {
    try {
        let infante = await deleteInfante(request.params.id);
        return response.status(200).json({ status: 200, data: infante, message: "Ok" });
    } catch (error) {
        return response.status(400).json({ status: 400, message: error.message });
    }
};
