// import supertest
const request = require('supertest');
//import express
const express = require('express');
// import weather route
const weatherRoute = require('../src/routes/weather');
// import getWeatherForLocation function from weather service
const { getWeatherForLocation } = require('../src/services/weatherService');

// create mock service
jest.mock('../src/services/weatherService');

// create app instance and use the weather route
const app = express();
app.use('/', weatherRoute);

// test environment for weather route
describe('GET /weather', () => {
    // clean up mocks after each test
    afterEach(() => jest.clearAllMocks());
    
    // individual tests for weather route
    it('returns 400 when lat is missing', async () => {
    const res = await request(app).get('/weather?lon=-93.2');
    expect(res.status).toBe(400);
    });
    
    it('returns 400 when lon is missing', async () => {
    const res = await request(app).get('/weather?lat=37.3');
    expect(res.status).toBe(400);
    });

    it('returns 200 with weather data on success', async () => {
        getWeatherForLocation.mockResolvedValue({
        name: 'Today',
        temperature: 72,
        temperatureUnit: 'F',
        shortForecast: 'Partly Cloudy',
        tempCharacterization: 'moderate',
        });

        const res = await request(app).get('/weather?lat=37.3&lon=-93.2');
        expect(res.status).toBe(200);
        expect(res.body.temperature).toBe(72);
        expect(res.body.tempCharacterization).toBe('moderate');
    });

    it('returns 500 when service throws', async () => {
        getWeatherForLocation.mockRejectedValue(new Error('NWS API down'));

        const res = await request(app).get('/weather?lat=37.3&lon=-93.2');
        expect(res.status).toBe(500);
    });
});