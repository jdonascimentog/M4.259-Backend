"use strict";

const express = require("express");
const agenda = express.Router();

const AgendaCtrl = require("./agenda.controller");

agenda.get("/:id/rol/:rol", AgendaCtrl.getEventos);
agenda.delete("/:id", AgendaCtrl.deleteAgenda);
agenda.delete("/evento/:id", AgendaCtrl.deleteEvento);
agenda.post("/aula/", AgendaCtrl.postAgendaAula);
agenda.post("/centro/", AgendaCtrl.postAgendaCentro);
agenda.post("/evento/", AgendaCtrl.postEvento);
agenda.put("/", AgendaCtrl.putAgenda);

module.exports = agenda;
