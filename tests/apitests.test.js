const request = require('supertest');
const app = require();
const { Pool } = require('pg');

if (process.env.NODE_ENV === 'development') {
    db = new Pool({  
    user: process.env.POSTGRES_USER,
    host: 'database',
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: 5432 
    })
}

describe('GET /students', () => {
    it('responds with json', async () => {
    const response = await request(app)
        .get('/students')
        .expect('Content-Type', /json/)
        .expect(200); // This checks that the HTTP status code is 200

    // Additional assertions...
    expect(response.body).toBeInstanceOf(Array);
    });
});