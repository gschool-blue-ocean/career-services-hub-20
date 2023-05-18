const request = require('supertest');
const app = 'http://api:80';
const { Pool } = require('pg');

describe('GET /students', () => {
    it('responds with json', async () => {
        const response = await request(app)
            .get('/students')
            .expect('Content-Type', /json/) // make sure we get a son
            .expect(200); // check status code

        expect(response.body).toBeInstanceOf(Array);
    });
});