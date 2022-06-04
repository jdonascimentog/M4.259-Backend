"use strict";

const express = require("express");
const usuarios = express.Router();

const UsuariosCtrl = require("./usuarios.controllers");

usuarios.get("/", UsuariosCtrl.getUsuarios);
usuarios.get("/:id", UsuariosCtrl.getUsuario);
usuarios.get("/:id/roles", UsuariosCtrl.getUsuarioRoles);
usuarios.get("/rol/:id", UsuariosCtrl.getUsuariosByRol);
usuarios.get("/rol/:id/centro/:id_centro", UsuariosCtrl.getUsuariosByRolCentro);
usuarios.get("/email/:email", UsuariosCtrl.getUsuarioByEmail);
usuarios.post("/validate", UsuariosCtrl.postValidateUser);
usuarios.post("/centro/:id", UsuariosCtrl.postUsuarioAdminCentro);
usuarios.post("/centro/:id/aula/:id_aula", UsuariosCtrl.postUsuarioEducador);

module.exports = usuarios;
