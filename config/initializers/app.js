"use strict";

const express = require("express");
const cors = require("cors");
const app = express();

const usuarios = require("./../../app/usuarios/usuarios.routes");
const centros = require("./../../app/centros/centros.routes");
const aulas = require("../../app/aulas/aulas.routes");
const mensajeria = require("../../app/mensajes/mensajes.routes");
const infantes = require("../../app/infantes/infantes.routes");
const libros = require("../../app/libros/libros.routes");
const agenda = require("../../app/agenda/agenda.routes");

const bodyParser = require("body-parser");

app.use(cors());

app.use(bodyParser.json());

app.use("/usuarios", usuarios);
app.use("/centros", centros);
app.use("/aulas", aulas);
app.use("/mensajeria", mensajeria);
app.use("/infantes", infantes);
app.use("/libros", libros);
app.use("/agenda", agenda);

module.exports = app;
