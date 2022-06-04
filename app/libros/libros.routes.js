"use strict";

const express = require("express");
const libros = express.Router();

const LibrosCtrl = require("./libros.controller");

libros.delete("/:id", LibrosCtrl.deleteLibro);
libros.delete("/pregunta/:id", LibrosCtrl.deletePregunta);
libros.post("/", LibrosCtrl.postLibro);
libros.post("/:id/pregunta/", LibrosCtrl.postPregunta);
libros.put("/pregunta/respuesta", LibrosCtrl.putPreguntaRespuesta);

module.exports = libros;
