"use strict";

const express = require("express");
const cors = require("cors");
const app = express();

const usuarios = require("./../../app/usuarios/usuarios.routes");

const bodyParser = require("body-parser");

app.use(cors());

app.use(bodyParser.json());

app.use("/usuarios", usuarios);

module.exports = app;
