'use strict';

const server = require('../src/server.js');
const supertest = require('supertest');
const request = supertest(server.app);

describe('API Server', () => {
    it('handles invalid routes', async () => {
        const response = await request.get('/non-existent-route');
        expect(response.status).toEqual(404);
    });
});