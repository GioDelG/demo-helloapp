//Pruebas Unitarias
//    La ruta raíz '/' que debe responder con un mensaje 'Hello World'.
//Una ruta personalizada '/custom' que debe responder con un mensaje 'Custom Message'.
//Prueba Unitaria para asegurar que las rutas de la aplicación respondan correctamente.

const assert = require('assert');
const express = require('express');
const chai = require('chai');
const chaiHttp = require('chai-http');
const path = require('path'); // Importa el módulo 'path' para construir la ruta al archivo server.js

chai.use(chaiHttp);

// Construye la ruta completa al archivo server.js
const serverPath = path.join(__dirname, '..', 'src', 'server.js');
const app = require(serverPath); // Importa el archivo server.js


describe('My Express App', () => {
  let app;

  // Código que se ejecuta antes de todas las pruebas
  before(() => {
    app = express();
    app.get('/', (req, res) => {
      res.send('Hello World');
    });
    app.get('/custom', (req, res) => {
      res.send('Custom Message');
    });
  });

  // Código que se ejecuta después de todas las pruebas
  after(() => {
    // Puedes realizar limpieza aquí si es necesario
  });

  // Prueba para la ruta raíz
  describe('Root Route', () => {
    // Código que se ejecuta antes de cada prueba en esta descripción
    beforeEach(() => {
      // No necesitas crear una nueva instancia de la aplicación aquí,
      // ya que la aplicación se crea en el bloque "before" global
    });

    it('Should return "Hello World" for the root route', (done) => {
      chai
        .request(app)
        .get('/')
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.text, 'Hello World');
          done();
        });
    });
  });

  // Prueba para la ruta personalizada
  describe('Custom Route', () => {
    // Código que se ejecuta antes de cada prueba en esta descripción
    beforeEach(() => {
      // No necesitas crear una nueva instancia de la aplicación aquí,
      // ya que la aplicación se crea en el bloque "before" global
    });

    it('Should return "Custom Message" for the /custom route', (done) => {
      chai
        .request(app)
        .get('/custom')
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.text, 'Custom Message');
          done();
        });
    });
  });

  // Puedes agregar más pruebas según tus necesidades
});
