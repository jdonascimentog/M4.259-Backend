"use strict";

const { getAulas, getAulasByCentro, getAulasById, putAula, postAula, deleteAula } = require("./aulas.services");

exports.getAulas = async (request, response, next) => {
    try {
        let aulas = await getAulas();
        return response.status(200).json({ status: 200, data: aulas, message: "Ok" });
    } catch (error) {
        return response.status(400).json({ status: 400, message: error.message });
    }
};

exports.getAulasByCentro = async (request, response, next) => {
    try {
        let aulas = await getAulasByCentro(request.params.id);
        return response.status(200).json({ status: 200, data: aulas, message: "Ok" });
    } catch (error) {
        return response.status(400).json({ status: 400, message: error.message });
    }
};

exports.getAulasById = async (request, response, next) => {
    try {
        let aulas = await getAulasById(request.params.id);
        return response.status(200).json({ status: 200, data: aulas, message: "Ok" });
    } catch (error) {
        return response.status(400).json({ status: 400, message: error.message });
    }
};

exports.putAula = async (request, response, next) => {
    try {
        let aula = await putAula(request.body);
        return response.status(200).json({ status: 200, data: aula, message: "Ok" });
    } catch (error) {
        return response.status(400).json({ status: 400, message: error.message });
    }
};

exports.postAula = async (request, response, next) => {
    try {
        let aula = await postAula(request.body);
        return response.status(200).json({ status: 200, data: aula, message: "Ok" });
    } catch (error) {
        return response.status(400).json({ status: 400, message: error.message });
    }
};

exports.deleteAula = async (request, response, next) => {
    try {
        let aula = await deleteAula(request.params.id);
        return response.status(200).json({ status: 200, data: aula, message: "Ok" });
    } catch (error) {
        return response.status(400).json({ status: 400, message: error.message });
    }
};
