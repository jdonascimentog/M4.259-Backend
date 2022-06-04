"use strict";

const express = require("express");
const aulas = express.Router();

const AulasCtrl = require("./aulas.controller");

aulas.get("/", AulasCtrl.getAulas);
aulas.get("/:id", AulasCtrl.getAulasById);
aulas.get("/centro/:id", AulasCtrl.getAulasByCentro);
aulas.put("/", AulasCtrl.putAula);
aulas.post("/", AulasCtrl.postAula);
aulas.delete("/:id", AulasCtrl.deleteAula);

module.exports = aulas;
