const request = require('supertest');
const app = require('./app');

// Tests for /mean endpoint
describe('Test /mean endpoint', () => {
    test('it should calculate mean of valid numbers', async () => {
        const response = await request(app).get('/mean?nums=1,2,3,4,5');
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({
            response: {
                operation: 'mean',
                value: 3,
            },
        });
    });

    test('it should return an error when an invalid element is passed to nums', async () => {
        const response = await request(app).get('/mean?nums=foo,1,2,3');
        expect(response.statusCode).toBe(400);
        expect(response.body).toEqual({
            error: {
                message: 'foo is not a number.',
                status: 400,
            },
        });
    });

    test('it should return an error when nums is missing', async () => {
        const response = await request(app).get('/mean');
        expect(response.statusCode).toBe(400);
        expect(response.body).toEqual({
            error: {
                message: 'nums are required.',
                status: 400,
            },
        });
    });
});

// Tests for /median endpoint
describe('Test /median endpoint', () => {
    test('it should calculate the median of valid numbers when length of nums is ODD', async () => {
        const response = await request(app).get('/median?nums=1,2,3,4,5');
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({
            response: {
                operation: 'median',
                value: 3,
            },
        });
    });

    test('it should calculate the median of valid numbers when length of nums is EVEN', async () => {
        const response = await request(app).get('/median?nums=1,2,3,4,5,6');
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({
            response: {
                operation: 'median',
                value: 3.5,
            },
        });
    });

    test('it should return an error when an invalid element is passed to nums', async () => {
        const response = await request(app).get('/mean?nums=1,2,foo,3');
        expect(response.statusCode).toBe(400);
        expect(response.body).toEqual({
            error: {
                message: 'foo is not a number.',
                status: 400,
            },
        });
    });

    test('it should return an error when nums is missing', async () => {
        const response = await request(app).get('/mean');
        expect(response.statusCode).toBe(400);
        expect(response.body).toEqual({
            error: {
                message: 'nums are required.',
                status: 400,
            },
        });
    });
});
