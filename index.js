'use strict';

const app = require('./config/initializers/app');
const config = require('./config/initializers/config');

app.listen(config.puerto, function() {
    console.log('Servidor en marcha en el puerto ' + config.puerto);
});