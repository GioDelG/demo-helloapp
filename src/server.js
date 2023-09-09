// Modo 'strict' para prevenir ciertos errores comunes en JavaScript
'use strict';
// Importa la librería Express para construir el servidor
const express = require('express');
// Obtiene las variables de entorno, con valores predeterminados si no están definidas
const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || '0.0.0.0';
const greetingMessage = process.env.GREETING_MESSAGE || 'Hello World';
// Crea una instancia de la aplicación Express
const app = express();
// Define una ruta raíz que responderá con el mensaje de saludo
app.get('/', (req, res) => {
    res.send(greetingMessage);
});
// Define una ruta de salud que se puede utilizar para comprobar el estado del servidor
app.get('/health', (req, res) => {
    res.status(200).send('Healthy');
});
// Inicia el servidor Express en el puerto y host especificados
app.listen(PORT, HOST, () => {
    console.log(`Running on http://${HOST}:${PORT}`);
});
// Exporta la aplicación para usarla en otros módulos si es necesario
module.exports = app;