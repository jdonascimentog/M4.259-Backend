"use strict";

const express = require("express");
const centros = express.Router();

const CentrosCtrl = require("./centros.controller");

centros.get("/", CentrosCtrl.getCentros);
centros.get("/:id", CentrosCtrl.getCentro);
centros.put("/", CentrosCtrl.putCentro);
centros.post("/", CentrosCtrl.postCentro);
centros.delete("/:id", CentrosCtrl.deleteCentro);

module.exports = centros;
