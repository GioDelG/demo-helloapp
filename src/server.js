'use strict';
const express = require('express');

// Variables de entorno
const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || '0.0.0.0';
const greetingMessage = process.env.GREETING_MESSAGE || 'Hello World';

// App
const app = express();

app.get('/', (req, res) => {
    res.send(greetingMessage);
});

app.get('/health', (req, res) => {
    res.status(200).send('Healthy');
});

app.listen(PORT, HOST, () => {
    console.log(`Running on http://${HOST}:${PORT}`);
});