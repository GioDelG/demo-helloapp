const assert = require('assert');
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const app = require('../src/server'); // Importa el archivo server.js

describe('My Express App', () => {

  // Prueba para la ruta raíz
  describe('Root Route', () => {
    it('Should return greeting message for the root route', (done) => {
      chai
        .request(app)
        .get('/')
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.text, 'Hello World'); // Puedes adaptarlo si cambias el mensaje predeterminado
          done();
        });
    });
  });

  // Prueba para la ruta /health
  describe('/health Route', () => {
    it('Should return "Healthy" for the /health route', (done) => {
      chai
        .request(app)
        .get('/health')
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.text, 'Healthy');
          done();
        });
    });
  });
});