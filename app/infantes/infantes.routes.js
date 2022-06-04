"use strict";

const express = require("express");
const infantes = express.Router();

const InfantesCtrl = require("./infantes.controller");

infantes.get("/aula/:id", InfantesCtrl.getInfantesByAula);
infantes.get("/:id", InfantesCtrl.getInfanteById);
infantes.get("/progenitor/:id", InfantesCtrl.getInfantesByProgenitor);
infantes.put("/", InfantesCtrl.putInfante);
infantes.post("/", InfantesCtrl.postInfante);
infantes.delete("/:id", InfantesCtrl.deleteInfante);

module.exports = infantes;
