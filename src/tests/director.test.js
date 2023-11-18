const request = require('supertest');
const app = require('../app');
require('../models');

let id;

test("GET /directors debe traer a todos los directores", async () => {
    const res = await request(app).get('/directors');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test("POST /directors debe crear un nuevo director", async () => {
    const director = {
        firstName: "Dago",
        lastName: "Garcia",
        nationality: "Colombian",
        image: "https://images.mubicdn.net/images/cast_member/279491/cache-464082-1566447143/image-w856.jpg?size=800x",
        birthday: "2023-11-22"
    };
    const res = await request(app).post('/directors').send(director);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.firstName).toBe(director.firstName);
});

test("PUT /directors/:id debe actualizar un director", async () => {
    const director = {
        birthday: "1962-02-11"
    };
    const res = await request(app).put(`/directors/${id}`).send(director);
    expect(res.status).toBe(200)
    expect(res.birthday).toBe(director.firstName);
});

test("DELETE /directors/:id debe eliminar un director", async () => {
    const res = await request(app).delete(`/directors/${id}`);
    expect(res.status).toBe(204);
});