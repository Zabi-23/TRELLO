
// test/example.test.ts

import request from 'supertest';
import app from '../index';

describe('GET /api/example', () => {
    it('ska returnera en hälsning', async () => {
        const response = await request(app).get('/api/example');
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Hello, World!');
    });
});


