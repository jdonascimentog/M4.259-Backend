"use strict";

const express = require("express");
const mensajes = express.Router();

const MensajesCtrl = require("./mensajes.controller");

mensajes.get("/:id", MensajesCtrl.getMensajesUser);
mensajes.get("/:id/rol/:rol", MensajesCtrl.getContactosUser);
mensajes.post("/", MensajesCtrl.postMensaje);
mensajes.delete("/:id", MensajesCtrl.deleteMensaje);

module.exports = mensajes;
