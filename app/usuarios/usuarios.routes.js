"use strict";

const express = require("express");
const usuarios = express.Router();

const UsuariosCtrl = require("./usuarios.controllers");

usuarios.get("/", UsuariosCtrl.getUsuarios);
usuarios.get("/:id", UsuariosCtrl.getUsuario);
usuarios.get("/email/:email", UsuariosCtrl.getUsuarioByEmail);

module.exports = usuarios;
