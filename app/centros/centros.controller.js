"use strict";

const { getCentros, getCentroById, putCentro, postCentro, deleteCentro } = require("./centros.services");

exports.getCentros = async (request, response, next) => {
    try {
        let centros = await getCentros();
        return response.status(200).json({ status: 200, data: centros, message: "Ok" });
    } catch (error) {
        return response.status(400).json({ status: 400, message: error.message });
    }
};

exports.getCentro = async (request, response, next) => {
    try {
        let centros = await getCentroById(request.params.id);
        return response.status(200).json({ status: 200, data: centros, message: "Ok" });
    } catch (error) {
        return response.status(400).json({ status: 400, message: error.message });
    }
};

exports.putCentro = async (request, response, next) => {
    try {
        let centros = await putCentro(request.body);
        return response.status(200).json({ status: 200, data: centros, message: "Ok" });
    } catch (error) {
        return response.status(400).json({ status: 400, message: error.message });
    }
};

exports.postCentro = async (request, response, next) => {
    try {
        let centros = await postCentro(request.body);
        return response.status(200).json({ status: 200, data: centros, message: "Ok" });
    } catch (error) {
        return response.status(400).json({ status: 400, message: error.message });
    }
};

exports.deleteCentro = async (request, response, next) => {
    try {
        let centros = await deleteCentro(request.params.id);
        return response.status(200).json({ status: 200, data: centros, message: "Ok" });
    } catch (error) {
        return response.status(400).json({ status: 400, message: error.message });
    }
};
