"use strict";

const { postLibro, postPregunta, putPregunta, putPreguntaRespuesta, deleteLibro, deletePregunta } = require("./libros.services");

exports.postLibro = async (request, response, next) => {
    try {
        let libro = await postLibro(request.body);
        return response.status(200).json({ status: 200, data: libro, message: "Ok" });
    } catch (error) {
        return response.status(400).json({ status: 400, message: error.message });
    }
};

exports.postPregunta = async (request, response, next) => {
    try {
        let libro = await postPregunta(request.params.id, request.body);
        return response.status(200).json({ status: 200, data: libro, message: "Ok" });
    } catch (error) {
        return response.status(400).json({ status: 400, message: error.message });
    }
};

exports.putPregunta = async (request, response, next) => {
    try {
        let libro = await putPregunta(request.body);
        return response.status(200).json({ status: 200, data: libro, message: "Ok" });
    } catch (error) {
        return response.status(400).json({ status: 400, message: error.message });
    }
};

exports.putPreguntaRespuesta = async (request, response, next) => {
    try {
        let libro = await putPreguntaRespuesta(request.body);
        return response.status(200).json({ status: 200, data: libro, message: "Ok" });
    } catch (error) {
        return response.status(400).json({ status: 400, message: error.message });
    }
};

exports.deleteLibro = async (request, response, next) => {
    try {
        let libro = await deleteLibro(request.params.id);
        return response.status(200).json({ status: 200, data: libro, message: "Ok" });
    } catch (error) {
        return response.status(400).json({ status: 400, message: error.message });
    }
};

exports.deletePregunta = async (request, response, next) => {
    try {
        let libro = await deletePregunta(request.params.id);
        return response.status(200).json({ status: 200, data: libro, message: "Ok" });
    } catch (error) {
        return response.status(400).json({ status: 400, message: error.message });
    }
};
