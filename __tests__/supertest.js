
const { response } = require('express');
const request = require('supertest');

const server = 'http://localhost:3068';

describe('Route integration', () => {
  describe('/', () => {
    describe('GET', () => {
      it('responds with 200 status and text/html content type', () =>
        request(server)
          .get('/')
          .expect('Content-Type', /text\/html/)
          .expect(200));
    });
  });
  describe('/logs/logsbyindex', () => {
    describe('GET', () => {
      it('responds with 200 status and application/json content type', () =>
        request(server)
          .get('/logs/logsbyindex')
          .expect('Content-Type', /application\/json/)
          .expect(200));
    });
  });
  describe('/indexpatterns', () => {
    describe('GET', () => {
      it('responds with 200 status and application/json content type', () =>
        request(server)
          .get('/indexpatterns')
          .expect('Content-Type', /application\/json/)
          .expect(200));
    });
  });
  describe('/alerts', () => {
    describe('GET', () => {
      it('responds with 200 status and application/json content type', () =>
        request(server)
          .get('/alerts')
          .expect('Content-Type', /application\/json/)
          .expect(200));
    });
  });
});